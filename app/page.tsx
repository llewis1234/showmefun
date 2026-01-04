import { Container } from "@/components/layout/Container";
import { VibeBar } from "@/components/search/VibeBar";
import { EventGrid } from "@/components/events/EventGrid";
import { EmptyState } from "@/components/events/EmptyState";
import { fetchAllVibes, fetchEvents } from "@/lib/queries";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default async function HomePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const vibesParam = typeof searchParams.vibes === "string" ? searchParams.vibes : "";
  const selectedVibes = vibesParam ? vibesParam.split(",").map(s => s.trim()).filter(Boolean) : [];

  const [vibes, { rows }] = await Promise.all([
    fetchAllVibes(),
    fetchEvents({ vibes: selectedVibes, limit: 18 })
  ]);

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Proof of concept</Badge>
            <Badge>Local-ish</Badge>
            <Badge>Click vibes to filter</Badge>
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            What&apos;s the vibe?
          </h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            Click a few vibe chips and browse what&apos;s coming up. No accounts. No nonsense.
          </p>

          <div className="mt-6">
            <VibeBar vibes={vibes.length ? vibes : []} />
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/search${selectedVibes.length ? `?vibes=${encodeURIComponent(selectedVibes.join(","))}` : ""}`}
              className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
            >
              Open full search →
            </Link>
            <Link
              href="/search"
              className="rounded-2xl bg-transparent px-4 py-3 text-sm text-white/70 hover:text-white"
            >
              Browse everything
            </Link>
          </div>
        </div>

        {rows.length ? <EventGrid rows={rows} /> : <EmptyState />}
      </div>
    </Container>
  );
}
