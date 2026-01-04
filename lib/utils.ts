import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  // iso is YYYY-MM-DD
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(t: string | null | undefined) {
  if (!t) return "";
  // expected HH:MM:SS
  const m = /^(\d{2}):(\d{2})(?::\d{2})?$/.exec(t);
  if (!m) return t;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  const dt = new Date();
  dt.setHours(hh, mm, 0, 0);
  return dt.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function uniqSorted(tags: string[]) {
  const cleaned = tags.map(t => t.trim()).filter(Boolean);
  return Array.from(new Set(cleaned)).sort((a, b) => a.localeCompare(b));
}
