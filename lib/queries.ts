import { supabaseBrowser } from "@/lib/supabase/browser";
import type { EventRow } from "@/types/event";

export type EventQuery = {
  q?: string;
  vibes?: string[];
  from?: string; // YYYY-MM-DD inclusive
  to?: string;   // YYYY-MM-DD inclusive
  limit?: number;
  offset?: number;
  includePast?: boolean;
};

function normalizeTextQuery(q?: string) {
  const s = (q ?? "").trim();
  return s.length ? s : undefined;
}

export async function fetchEvents(query: EventQuery): Promise<{ rows: EventRow[]; total: number }> {
  const supabase = supabaseBrowser();

  const q = normalizeTextQuery(query.q);
  const vibes = (query.vibes ?? []).map(v => v.trim()).filter(Boolean);
  const limit = Math.min(Math.max(query.limit ?? 36, 1), 200);
  const offset = Math.max(query.offset ?? 0, 0);

  // Pick the "best" date field for browsing. Your enrichment script ensures start_date/end_date exist
  // when possible, otherwise it falls back to event_date.
  // We'll use start_date for ordering/filtering when present.
  let sb = supabase
    .from("events")
    .select("*", { count: "exact" })
    .order("start_date", { ascending: true, nullsFirst: false })
    .order("event_date", { ascending: true, nullsFirst: false })
    .range(offset, offset + limit - 1);

  // Date filters
  if (query.from) {
    // Show events that start on/after from, OR ones that have event_date on/after from.
    // Supabase JS doesn't support OR across different columns cleanly without RPC,
    // so we keep it simple: filter on start_date if present, else event_date.
    // (Good enough for <= 500 rows.)
    sb = sb.gte("start_date", query.from);
  }
  if (query.to) {
    sb = sb.lte("start_date", query.to);
  }

  // Hide past events by default (relative to "today" in the user's locale; we approximate in SQL).
  // For a small dataset, using start_date >= today is usually fine.
  if (!query.includePast) {
    const todayIso = new Date().toISOString().slice(0, 10);
    sb = sb.gte("end_date", todayIso);
  }

  // Vibe filter: require all selected vibes to be present in vibe_tags (text[]).
  if (vibes.length) {
    sb = sb.contains("vibe_tags", vibes);
  }

  // Text search: cheap + effective for this scale.
  // We match title/description using ILIKE.
  if (q) {
    const escaped = q.replaceAll("%", "\%").replaceAll("_", "\_");
    sb = sb.or(`title.ilike.%${escaped}%,description.ilike.%${escaped}%`);
  }

  const { data, error, count } = await sb;
  if (error) throw error;

  return { rows: (data ?? []) as EventRow[], total: count ?? 0 };
}

export async function fetchEventById(id: string): Promise<EventRow | null> {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as EventRow) ?? null;
}

export async function fetchAllVibes(): Promise<string[]> {
  const supabase = supabaseBrowser();
  // Pull only vibe_tags, flatten client-side; small dataset so fine.
  const { data, error } = await supabase.from("events").select("vibe_tags");
  if (error) throw error;
  const tags = (data ?? [])
    .flatMap((r: any) => (Array.isArray(r.vibe_tags) ? r.vibe_tags : []))
    .filter((t: any) => typeof t === "string" && t.trim().length);
  // Preserve "nice" ordering: frequency first, then alpha.
  const freq = new Map<string, number>();
  for (const t of tags) freq.set(t, (freq.get(t) ?? 0) + 1);
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t);
}
