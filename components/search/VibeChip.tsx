"use client";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function VibeChip({ label, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
        "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
        active && "bg-white/15 text-white border-white/20"
      )}
    >
      {label}
    </button>
  );
}
