"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VibeChip } from "@/components/search/VibeChip";

type Props = {
  vibes: string[];
};

function splitTags(s: string | null) {
  if (!s) return [];
  return s.split(",").map(x => x.trim()).filter(Boolean);
}

export function VibeBar({ vibes }: Props) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selected = useMemo(() => splitTags(sp.get("vibes")), [sp]);

  function toggle(tag: string) {
    const next = new Set(selected);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);

    const params = new URLSearchParams(sp.toString());
    if (next.size) params.set("vibes", Array.from(next).join(","));
    else params.delete("vibes");

    // Reset paging when filters change
    params.delete("offset");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {vibes.map(v => (
        <VibeChip key={v} label={v} active={selected.includes(v)} onClick={() => toggle(v)} />
      ))}
    </div>
  );
}
