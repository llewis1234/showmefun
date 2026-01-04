"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useEffect, useMemo, useState } from "react";

export function SearchBar() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initial = useMemo(() => sp.get("q") ?? "", [sp]);
  const [value, setValue] = useState(initial);

  useEffect(() => setValue(initial), [initial]);

  function apply(next: string) {
    const params = new URLSearchParams(sp.toString());
    const q = next.trim();
    if (q) params.set("q", q);
    else params.delete("q");
    params.delete("offset");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search title/description (optional)"
      />
      <Button onClick={() => apply(value)}>Go</Button>
      <Button variant="ghost" onClick={() => { setValue(""); apply(""); }}>Clear</Button>
    </div>
  );
}
