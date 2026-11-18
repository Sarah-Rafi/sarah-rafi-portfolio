/**
 * THE place to add projects. Copy one object, edit it, save — the site updates.
 * See ADDING_PROJECTS.md.
 */
export type ProjectCategory = 'mobile' | 'web' | 'fullstack';

export interface Project {
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  highlights: string[];
  links: { playStore?: string; appStore?: string; website?: string; github?: string };
  /** Any CSS color — tints the card glow. */
  accent: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: 'Haveli Lahore',
    tagline: 'Angular concept site for a rooftop restaurant',
    description:
      'An unofficial concept redesign for Haveli Restaurant on Lahore’s Food Street. It is built with Angular 22, signals, lazy routes, a live-filtered menu of 100+ dishes and a validated reservation form.',
    category: 'web',
    stack: ['Angular 22', 'Signals', 'Reactive Forms', 'SCSS', 'Vercel'],
    highlights: ['Signal-driven menu search and filters', 'View Transitions between routes', 'Scroll-driven dusk-to-night sky'],
    links: { website: 'https://haveli-lahore.vercel.app', github: 'https://github.com/Sarah-Rafi/haveli-lahore' },
    accent: '#e0a84b',
    featured: true,
  },
  {
    title: 'StepPals',
    tagline: 'Virtual pet step tracker',
    description:
      'Rebuilt a Unity-based fitness game in React Native while preserving existing user accounts and progress.',
    category: 'mobile',
    stack: ['React Native', 'Skia', 'Supabase', 'PlayFab', 'RevenueCat', 'HealthKit', 'Health Connect'],
    highlights: ['Unity → React Native migration with zero data loss', 'Skia animations & virtual currency', 'Walking clubs'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.benleavitt.steppals',
      appStore: 'https://apps.apple.com/hk/app/step-pals-walking-app/id6747041627',
    },
    accent: '#7cf29c',
    featured: true,
  },
  {
    title: 'CineMENA',
    tagline: 'Social movie night platform',
    description:
      'A bilingual (English/Arabic, RTL) Next.js platform for movie discovery, cinema showtimes and group planning.',
    category: 'fullstack',
    stack: ['Next.js', 'WebSockets', 'Clerk', 'PostgreSQL', 'Redis'],
    highlights: ['Real-time group voting', 'Recommendation matching', 'Full RTL support'],
    links: { website: 'https://cinemena.app' },
    accent: '#ff6b8b',
    featured: true,
  },
  {
    title: 'Donezo',
    tagline: 'Handyman & local help marketplace',
    description:
      'A React Native (Expo) service marketplace with identity verification, subscriptions and cross-platform promo codes.',
    category: 'mobile',
    stack: ['React Native', 'Expo', 'ShuftiPro', 'RevenueCat'],
    highlights: ['KYC identity verification', 'Promo code & redemption flows', 'Subscriptions'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.favorappllc.mobile',
      appStore: 'https://apps.apple.com/us/app/donezo-local-help-and-services/id6754607132',
    },
    accent: '#5ab0ff',
  },
  {
    title: 'AI Home Inspection',
    tagline: 'AI-powered property inspections',
    description:
      'A React Native (Expo) app with image analysis, automated inspection reports, interactive AI chat and paid PDF reports.',
    category: 'mobile',
    stack: ['React Native', 'Expo', 'LLM APIs', 'RevenueCat'],
    highlights: ['AI image analysis', 'Automated PDF reports', 'In-app AI chat'],
    links: { appStore: 'https://apps.apple.com/us/app/ai-home-inspection/id6754088850' },
    accent: '#b892ff',
  },
  {
    title: 'Mezordo',
    tagline: 'Pharmacy delivery app',
    description:
      'A French-language React Native (Expo) pharmacy app for uploading prescriptions and health cards, ordering medication and arranging local delivery.',
    category: 'mobile',
    stack: ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
    highlights: ['Prescription upload', 'Local pharmacy delivery', 'French localisation'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.mezordo.app',
      appStore: 'https://apps.apple.com/my/app/mezordo/id6749220185',
    },
    accent: '#4fd1c5',
  },
  {
    title: 'Train My Ears',
    tagline: 'Music learning app',
    description: 'Learn guitar and piano chords through interactive challenges, scoring and leaderboards.',
    category: 'mobile',
    stack: ['React Native', 'Expo', 'Social Auth'],
    highlights: ['Interactive ear-training challenges', 'Leaderboards'],
    links: { appStore: 'https://apps.apple.com/us/app/train-my-ear/id6748353964' },
    accent: '#ffb547',
  },
  {
    title: 'Trusty Living',
    tagline: 'Property discovery & tenant reviews',
    description: 'An SEO-optimised Next.js app for discovering properties and reading tenant reviews.',
    category: 'web',
    stack: ['Next.js', 'SSR', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Server-side rendering for SEO', 'Responsive UI'],
    links: { website: 'https://trustyliving.softaims.com/' },
    accent: '#6ee7b7',
  },
  {
    title: 'Snackout',
    tagline: 'Restaurant reservations platform',
    description:
      'A React Native platform for reservations, pre-orders and events, with React admin and vendor dashboards.',
    category: 'fullstack',
    stack: ['React Native', 'React', 'PostgreSQL', 'Prisma', 'REST'],
    highlights: ['Reservations & pre-orders', 'Admin + vendor dashboards'],
    links: { website: 'https://www.snackout.pk/' },
    accent: '#ff8a5b',
  },
  {
    title: 'Verte Charge',
    tagline: 'EV charging platform',
    description:
      'An EV charging app for station discovery, session monitoring and payments, with a React dashboard for station owners.',
    category: 'fullstack',
    stack: ['React Native', 'React', 'Payments', 'Maps'],
    highlights: ['Live session monitoring', 'Owner reservation dashboard'],
    links: { website: 'https://rhodium-tech.com/verte-charge' },
    accent: '#a3e635',
  },
];
