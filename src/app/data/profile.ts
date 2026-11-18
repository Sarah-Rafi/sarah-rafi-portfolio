export const PROFILE = {
  name: 'Sarah Rafi',
  location: 'Lahore, Pakistan',
  email: 'sarahrafi12345678@gmail.com',
  phone: '+923304248064',
  linkedin: 'https://www.linkedin.com/in/sarah-rafi-6417851b2',
  github: 'https://github.com/Sarah-Rafi',
  roles: ['Full Stack Engineer', 'Angular Developer', 'React Native Lead', 'Next.js & NestJS Builder'],
  summary:
    'Full stack software engineer with 4+ years of experience building scalable, user-focused web and mobile apps across healthcare, fitness, marketplaces and SaaS. I lead products end to end, from architecture to App Store releases, and I care about performance, maintainability and business outcomes.',
  stats: [
    { value: 4, suffix: '+', label: 'Years shipping' },
    { value: 9, suffix: '+', label: 'Products shipped' },
    { value: 5, suffix: '', label: 'Live store apps' },
    { value: 3, suffix: '', label: 'Client countries (UK · US · PK)' },
  ],
};

export const EXPERIENCE = [
  {
    role: 'Senior Software Engineer',
    company: 'Tectsoft',
    period: 'Jul 2026 — Present',
    points: [
      'Lead React Native development across several fitness apps built on Supabase.',
      'Pitch new features to clients with requirements, technical solutions and interactive prototypes.',
      'Contribute to architecture decisions, scalability and production performance.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Softaims',
    period: 'Jan 2025 — Jun 2026',
    points: [
      'Led React Native development, including Expo, EAS builds, OTA updates and store releases.',
      'Built web and backend apps with Next.js, NestJS and TypeScript (SSR, SSG and SEO).',
      'Worked directly with clients in the UK and USA.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Rhodium Tech',
    period: 'Sep 2023 — Dec 2024',
    points: [
      'Built responsive PWAs and cross-platform apps with React, TypeScript and React Native.',
      'Built Redux state management and integrated REST/GraphQL APIs with Node.js services.',
      'Set up AWS Amplify auth and hosting, and ran PostgreSQL and MongoDB databases.',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'A1 Strategez',
    period: 'Sep 2022 — Aug 2023',
    points: ['Built a MERN CV builder with dynamic templates and real-time previews.'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'CyberCO2',
    period: 'Jul 2022 — Aug 2022',
    points: ['Built Django REST APIs for a dating platform: matching, profiles and query optimisation.'],
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'React', 'Next.js', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'Tailwind CSS', 'SCSS', 'PWA'] },
  { group: 'Mobile', items: ['React Native', 'Expo', 'EAS', 'OTA Updates', 'Skia', 'Swift', 'Kotlin', 'TestFlight'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Django / DRF', 'REST', 'GraphQL', 'WebSockets', 'BullMQ', 'Redis'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Prisma', 'Firebase'] },
  { group: 'AI', items: ['LLM Integration', 'RAG', 'Vector DBs', 'Semantic Search', 'Prompt Engineering'] },
  { group: 'Cloud & Tools', items: ['Vercel', 'AWS', 'CI/CD', 'Playwright', 'Stripe', 'RevenueCat', 'Sentry', 'PostHog', 'Figma'] },
];

export const EDUCATION = { degree: 'BS Computer Science', school: 'FAST NUCES, Lahore', period: '2019 — 2023' };
