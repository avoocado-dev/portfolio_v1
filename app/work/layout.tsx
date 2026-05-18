import Link from "next/link";
import { Container } from "@/components/Container";
import { ScrollToTop } from "./ScrollToTop";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <Container as="header" className="max-w-4xl flex items-center justify-between pt-8 pb-4">
        <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
          ← All work
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm font-medium">
          <a
            href="/antonio-aguilar-resume.pdf"
            className="hover:text-accent transition-colors"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/avoantonio"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:antonioaguilar51@gmail.com"
            className="hover:text-accent transition-colors"
          >
            Contact
          </a>
          <a
            href="https://github.com/avoocado-dev/portfolio_v1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
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
