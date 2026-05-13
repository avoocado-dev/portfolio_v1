import Link from "next/link";
import { Container } from "@/components/Container";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container as="header" className="max-w-4xl flex items-center justify-between pt-8 pb-4">
        <Link href="/" className="text-sm hover:text-accent transition-colors">
          ← All work
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
          <a
            href="/antonio-aguilar-resume.pdf"
            className="hover:text-accent transition-colors"
          >
            Resume
          </a>
          <a
            href="mailto:antonioaguilar51@gmail.com"
            className="hover:text-accent transition-colors"
          >
            Contact
          </a>
        </nav>
      </Container>
      <main id="main" className="flex-1">
        <Container as="article" className="max-w-4xl pt-4 pb-12 md:pt-6 md:pb-20">
          {children}
        </Container>
      </main>
    </>
  );
}
