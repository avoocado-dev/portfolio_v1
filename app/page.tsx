import Image from "next/image";
import Link from "next/link";
import { Pill } from "@/components/Pill";
import { caseStudies } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <SelectedWork />
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 md:px-8 flex items-center justify-end pt-8 pb-4">
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
    </header>
  );
}

function Hero() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16 md:items-center">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-accent"
            />
            <span className="text-xs uppercase tracking-[0.18em] font-medium text-muted">
              Open to Frontend & UX engineering roles
            </span>
          </div>

          <h1 className="text-[length:var(--text-display)] font-bold leading-[1.02] tracking-tight">
            Howdy, I&rsquo;m Antonio.
          </h1>

          <p className="mt-6 text-2xl font-medium leading-snug text-foreground/85 max-w-xl">
            <span className="text-accent">
              I sit between engineering, design, and product
            </span>
          </p>

          <p className="mt-8 text-lg text-foreground/75 max-w-xl leading-relaxed">
            My 7+ years of technical experience, eye for design, and love for product uniquely position me to lead your UX.
            Wide breadth of skills attained from working at Microsoft, midsize, and startup companies.
          </p>
        </div>

        <figure className="md:max-w-md md:justify-self-end">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-surface">
            <Image
              src="/selfie.jpg"
              alt="Antonio on a ridge above the San Luis Obispo — dark short hair swept up, square frames, a navy tee with a small Ponyo print, hills out of focus behind."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 max-w-md text-sm text-foreground/70 leading-relaxed">
            <span className="font-semibold text-foreground/85">
              Image description.
            </span>{" "}
            A photo of me on a ridge above the San Luis Obispo &mdash; dark short
            hair swept up, square frames, a navy tee with a small Ponyo
            print, hills out of focus behind.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function SelectedWork() {
  return (
    <section
      aria-labelledby="work-heading"
      className="mx-auto w-full max-w-6xl px-6 md:px-8 pt-8 pb-16 md:pt-12 md:pb-24"
    >
      <div className="flex items-baseline justify-between mb-10">
        <h2 id="work-heading" className="text-[length:var(--text-h2)] font-bold tracking-tight">
          Selected works
        </h2>
        <span className="text-xs uppercase tracking-[0.18em] font-medium text-muted">
          {caseStudies.length} case {caseStudies.length === 1 ? "study" : "studies"}
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {caseStudies.map((cs) => (
          <li key={cs.slug}>
            <Link
              href={`/work/${cs.slug}`}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 -mx-4 px-4 py-8 transition-colors hover:bg-surface md:-mx-6 md:px-6"
            >
              <div>
                <h3 className="text-2xl font-semibold tracking-tight leading-tight group-hover:text-accent transition-colors">
                  {cs.title}
                </h3>
                <p className="mt-2 text-foreground/70 leading-relaxed">
                  {cs.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="self-start text-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}