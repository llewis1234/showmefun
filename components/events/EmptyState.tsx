import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function EmptyState() {
  return (
    <Card className="p-8 text-center">
      <div className="text-white font-semibold">No events match that vibe combo.</div>
      <div className="mt-2 text-sm text-white/70">
        Try fewer vibe chips, or clear search.
      </div>
      <div className="mt-6">
        <Link href="/search" className="text-sm text-white/80 hover:text-white underline">
          Go to Search
        </Link>
      </div>
    </Card>
  );
}
