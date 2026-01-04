import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "good" };

export function Badge({ className, tone = "neutral", ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        "border border-white/10 bg-white/10 text-white/90",
        tone === "good" && "bg-emerald-500/15 border-emerald-400/20 text-emerald-100",
        className
      )}
      {...props}
    />
  );
}
