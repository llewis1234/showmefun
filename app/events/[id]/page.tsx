import { Container } from "@/components/layout/Container";
import { fetchEventById } from "@/lib/queries";
import { formatDate, formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const ev = await fetchEventById(params.id);
  if (!ev) return notFound();

  const date = ev.start_date ?? ev.event_date;
  const end = ev.end_date;
  const time = ev.event_time;
  const primaryUrl = ev.url ?? ev.source_url;

  return (
    <Container className="py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/search" className="text-sm text-white/70 hover:text-white underline">
            ← Back to search
          </Link>
          {ev.is_verified ? <Badge tone="good">Verified</Badge> : <Badge>Unverified</Badge>}
          {ev.source ? <Badge>{ev.source}</Badge> : null}
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {ev.title ?? "(untitled)"}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2 text-sm text-white/70">
          {date ? <span className="rounded-xl bg-white/5 px-3 py-1">{formatDate(date)}</span> : null}
          {end && end !== date ? <span className="rounded-xl bg-white/5 px-3 py-1">→ {formatDate(end)}</span> : null}
          {time ? <span className="rounded-xl bg-white/5 px-3 py-1">{formatTime(time)}</span> : null}
          {ev.location ? <span className="rounded-xl bg-white/5 px-3 py-1">{ev.location}</span> : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(ev.vibe_tags ?? []).map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {t}
            </span>
          ))}
        </div>

        {ev.description ? (
          <div className="prose prose-invert mt-6 max-w-none">
            <p className="whitespace-pre-wrap text-white/80 leading-relaxed">{ev.description}</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
            >
              Open source page ↗
            </a>
          ) : null}
          <Link
            href={`/search?vibes=${encodeURIComponent((ev.vibe_tags ?? []).slice(0, 3).join(","))}`}
            className="rounded-2xl bg-transparent px-4 py-3 text-sm text-white/70 hover:text-white"
          >
            More like this →
          </Link>
        </div>
      </div>
    </Container>
  );
}
