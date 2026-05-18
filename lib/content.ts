export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pay-equity-analysis",
    title: "Pay Equity Analysis",
    summary: "UI Revamp of Syndio's flagship service",
    tags: ["Data Visualization", "UX Strategy", "Enterprise"],
  },
  {
    slug: "global-pay-reports",
    title: "Global Pay Reports",
    summary: "Syndio's newest service to meet a new pay reporting vertical",
    tags: ["UX Strategy", "Accessibility", "Enterprise"],
  },
  {
    slug: "syndi",
    title: "Syndi",
    summary: "Syndio's LLM Chatbox",
    tags: ["AI", "UX Strategy", "Enterprise"],
  },
];

export type Role = {
  company: string;
  title: string;
  timeframe: string;
  summary: string;
};

export const experience: Role[] = [
  {
    company: "Syndio",
    title: "Software Developer III — UX Engineering",
    timeframe: "2024 — Present",
    summary:
      "Lead the design-to-code pipeline for Syndio's compliance products. Build prototypes, ship production UI, and champion AI-augmented workflows across design and engineering.",
  },
  {
    company: "TreasureDAO",
    title: "Frontend Consultant",
    timeframe: "2023 — 2024",
    summary:
      "Translated Figma into pixel-perfect React. Took the marketplace mobile-responsive, tripled accessibility coverage, and improved SEO with proper ARIA and keyboard semantics.",
  },
  {
    company: "Microsoft",
    title: "Software Engineer",
    timeframe: "2019 — 2023",
    summary:
      "Built and maintained accessible UI components surfaced to 100k+ users. Partnered with researchers, designers, and accessibility specialists to ship across web, app, and mobile.",
  },
];

export type CompetencyGroup = {
  label: string;
  items: string[];
};

export const competencies: CompetencyGroup[] = [
  {
    label: "Design",
    items: [
      "Figma",
      "Prototyping",
      "User Research",
      "Design Systems",
      "Storybook",
      "Accessibility",
    ],
  },
  {
    label: "Engineering",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind",
      "Playwright",
      "Jest",
      "Axe",
    ],
  },
  {
    label: "AI & Workflow",
    items: [
      "Claude",
      "OpenAI Codex",
      "LLM UI patterns",
      "CI/CD",
      "LaunchDarkly",
      "Workflow automation",
    ],
  },
];
