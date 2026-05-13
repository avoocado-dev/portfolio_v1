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
    summary:
      "The field of pay equity has previously been dominated by legal consultants because of its focus on compliance, but when Syndio was founded in 2017, it was the first to productive the offering, transforming weeks of meetings and endless PDF reports to a visual analysis delivered directly to customers.",
    tags: ["Data Visualization", "UX Strategy", "Enterprise"],
  },
  {
    slug: "global-pay-reports",
    title: "Global Pay Reports",
    summary:
      "Built the frontend from scratch for Syndio's compliance product covering 35 jurisdictions across 43 countries. WCAG 2.1 AA from day one, Playwright + axe in CI as a quality gate. Now the company's 2nd-largest revenue line.",
    tags: ["UX Strategy", "Accessibility", "Enterprise"],
  },
  {
    slug: "right-to-information",
    title: "Right to Information",
    summary:
      "Built the frontend for Syndio's Article 7 product — pay-comparison data for every employee, delivered through six integration paths including HRIS push via Workato and one-click reports in all 24 official EU languages. Now the company's 3rd-largest revenue line.",
    tags: ["UX Strategy", "Integrations", "Enterprise"],
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
