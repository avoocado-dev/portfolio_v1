import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="mt-12 mb-6 text-4xl font-semibold tracking-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-12 mb-4 text-2xl font-semibold tracking-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 mb-3 text-lg font-semibold tracking-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="mt-6 mb-2 text-base font-medium tracking-tight text-foreground/90 scroll-mt-24"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 leading-7 text-foreground/80" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/80" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/80" {...props}>
        {children}
      </ol>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-accent underline-offset-4 hover:underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-2 border-accent/40 pl-4 text-foreground/70"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => <hr className="my-12 border-foreground/10" {...props} />,
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[0.9em]"
        {...props}
      >
        {children}
      </code>
    ),
    ...components,
  };
}
