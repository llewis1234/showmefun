import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl bg-white/5 px-4 text-white placeholder:text-white/50",
        "border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20",
        className
      )}
      {...props}
    />
  );
}
