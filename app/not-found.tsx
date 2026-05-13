import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <main id="main" className="flex-1 flex items-center">
      <Container className="py-32 text-center">
        <p className="text-xs uppercase tracking-[0.18em] font-medium text-muted mb-6">
          404 — page not found
        </p>
        <h1 className="text-[length:var(--text-display)] font-bold leading-[1.05] tracking-tight">
          That page doesn&rsquo;t exist.
        </h1>
        <p className="mt-6 text-lg text-foreground/70 max-w-md mx-auto">
          It may have moved, or you may have an out-of-date link.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-background font-medium hover:bg-accent transition-colors"
        >
          Back to home <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </main>
  );
}
