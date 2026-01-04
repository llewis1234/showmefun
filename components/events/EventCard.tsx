import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils";
import type { EventRow } from "@/types/event";

export function EventCard({ ev }: { ev: EventRow }) {
  const date = ev.start_date ?? ev.event_date;
  const time = ev.event_time;
  const primaryUrl = ev.url ?? ev.source_url;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href={`/events/${ev.id}`} className="text-white font-semibold hover:underline">
            {ev.title ?? "(untitled)"}
          </Link>
          <div className="mt-1 text-sm text-white/70 line-clamp-2">
            {ev.description ?? ""}
          </div>
        </div>
        {ev.is_verified ? <Badge tone="good">Verified</Badge> : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
        {date ? <span className="rounded-xl bg-white/5 px-3 py-1">{formatDate(date)}</span> : null}
        {time ? <span className="rounded-xl bg-white/5 px-3 py-1">{formatTime(time)}</span> : null}
        {ev.location ? <span className="rounded-xl bg-white/5 px-3 py-1">{ev.location}</span> : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(ev.vibe_tags ?? []).slice(0, 6).map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link href={`/events/${ev.id}`} className="text-sm text-white/80 hover:text-white">
          Details →
        </Link>
        {primaryUrl ? (
          <a href={primaryUrl} target="_blank" rel="noreferrer" className="text-sm text-white/60 hover:text-white/80">
            Source ↗
          </a>
        ) : null}
      </div>
    </Card>
  );
}
