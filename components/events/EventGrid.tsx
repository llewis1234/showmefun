import type { EventRow } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";

export function EventGrid({ rows }: { rows: EventRow[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((ev) => (
        <EventCard key={ev.id} ev={ev} />
      ))}
    </div>
  );
}
