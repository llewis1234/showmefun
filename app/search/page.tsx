import { Container } from "@/components/layout/Container";
import { VibeBar } from "@/components/search/VibeBar";
import { SearchBar } from "@/components/search/SearchBar";
import { EventGrid } from "@/components/events/EventGrid";
import { EmptyState } from "@/components/events/EmptyState";
import { fetchAllVibes, fetchEvents } from "@/lib/queries";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function getStr(sp: Record<string, any>, k: string) {
  const v = sp[k];
  return typeof v === "string" ? v : "";
}

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const q = getStr(searchParams, "q");
  const vibesParam = getStr(searchParams, "vibes");
  const includePast = getStr(searchParams, "past") === "1";
  const offset = Number(getStr(searchParams, "offset") || "0") || 0;

  const selectedVibes = vibesParam ? vibesParam.split(",").map(s => s.trim()).filter(Boolean) : [];

  const [vibes, result] = await Promise.all([
    fetchAllVibes(),
    fetchEvents({ q, vibes: selectedVibes, limit: 36, offset, includePast })
  ]);

  const nextOffset = offset + 36;
  const prevOffset = Math.max(offset - 36, 0);

  const baseParams = new URLSearchParams();
  if (q) baseParams.set("q", q);
  if (vibesParam) baseParams.set("vibes", vibesParam);
  if (includePast) baseParams.set("past", "1");

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
          <h1 className="text-2xl font-semibold">Search</h1>
          <p className="mt-1 text-sm text-white/70">
            Stack vibe chips to narrow. Add text search only if you need it.
          </p>

          <div className="mt-5">
            <SearchBar />
          </div>

          <div className="mt-5">
            <VibeBar vibes={vibes} />
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm">
            {includePast ? (
              <Link
                className="text-white/80 hover:text-white underline"
                href={`/search?${(() => { const p = new URLSearchParams(baseParams); p.delete("past"); p.delete("offset"); return p.toString(); })()}`}
              >
                Hide past events
              </Link>
            ) : (
              <Link
                className="text-white/80 hover:text-white underline"
                href={`/search?${(() => { const p = new URLSearchParams(baseParams); p.set("past", "1"); p.delete("offset"); return p.toString(); })()}`}
              >
                Include past events
              </Link>
            )}
            <span className="text-white/40">•</span>
            <span className="text-white/60">{result.total} match(es)</span>
          </div>
        </div>

        {result.rows.length ? <EventGrid rows={result.rows} /> : <EmptyState />}

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link
              className={`rounded-2xl px-4 py-3 text-sm font-medium ${offset === 0 ? "opacity-40 pointer-events-none" : "bg-white/10 hover:bg-white/15"}`}
              href={`/search?${(() => { const p = new URLSearchParams(baseParams); p.set("offset", String(prevOffset)); return p.toString(); })()}`}
            >
              ← Prev
            </Link>
            <Link
              className={`rounded-2xl px-4 py-3 text-sm font-medium ${nextOffset >= result.total ? "opacity-40 pointer-events-none" : "bg-white/10 hover:bg-white/15"}`}
              href={`/search?${(() => { const p = new URLSearchParams(baseParams); p.set("offset", String(nextOffset)); return p.toString(); })()}`}
            >
              Next →
            </Link>
          </div>
          <div />
        </div>
      </div>
    </Container>
  );
}
