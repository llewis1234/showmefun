import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-white/10 grid place-items-center text-white font-bold">S</div>
          <div className="leading-tight">
            <div className="text-white font-semibold">ShowMeFun</div>
            <div className="text-xs text-white/60">events, vibes, zero fuss</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-white/80 hover:text-white" href="/search">Search</Link>
          <a className="text-white/60 hover:text-white/80" href="https://supabase.com" target="_blank" rel="noreferrer">
            Supabase
          </a>
        </nav>
      </Container>
    </header>
  );
}
