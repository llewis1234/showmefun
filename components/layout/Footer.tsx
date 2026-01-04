import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-2 text-sm text-white/60">
        <div>Built for family & friends. No accounts. No drama.</div>
        <div className="text-xs text-white/40">Tip: click multiple vibe chips to narrow results.</div>
      </Container>
    </footer>
  );
}
