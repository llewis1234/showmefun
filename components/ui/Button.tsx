import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
  size?: "sm" | "md";
};

export function Button({ className, variant = "solid", size = "md", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition",
        "focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "solid" && "bg-white/10 hover:bg-white/15 text-white",
        variant === "ghost" && "bg-transparent hover:bg-white/10 text-white",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        className
      )}
      {...props}
    />
  );
}
