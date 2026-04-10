// Design system constants for consistent styling across the app

export const COLORS = {
  background: '#0a0e27',
  backgroundAlt: '#0d1433',
  foreground: '#ffffff',
  muted: '#64748b',

  cyan: '#00d4ff',
  cyanLight: '#67e8f9',
  cyanDark: '#0891b2',

  neonGreen: '#64ff6b',
  violet: '#7c3aed',
  violetLight: '#8b5cf6',

  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
} as const;

export const GRADIENTS = {
  cyanViolet: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
  cyanGreen: 'linear-gradient(135deg, #00d4ff, #64ff6b)',
  violetPink: 'linear-gradient(135deg, #7c3aed, #ec4899)',
  navyDeep: 'linear-gradient(180deg, #0a0e27 0%, #050818 100%)',
} as const;

export const FONT_FAMILIES = {
  sans: "'Inter', system-ui, sans-serif",
  display: "'Poppins', Inter, system-ui, sans-serif",
  mono: "'Space Mono', 'Courier New', monospace",
} as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1.0,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const Z_INDEX = {
  base: 0,
  elevated: 10,
  overlay: 20,
  modal: 30,
  toast: 40,
  nav: 50,
} as const;

export const SPACING = {
  section: 'py-24',
  sectionLg: 'py-32',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerNarrow: 'max-w-4xl mx-auto px-4 sm:px-6',
  containerWide: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
} as const;

export const COMPANY = {
  name: 'Webcraft Studio',
  tagline: 'Premium Web Development Agency',
  phone: '+918822322905',
  phoneDisplay: '+91 88223 22905',
  whatsapp: 'https://wa.me/918822322905',
  email: 'hello@webcraftstudio.com',
  location: 'Remote — Worldwide',
  website: 'https://webcraftstudio.com',
} as const;
