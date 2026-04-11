import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const premiumCardHover = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(6,182,212,0)' },
  hover: { y: -6, boxShadow: '0 20px 60px rgba(6,182,212,0.15)', transition: { duration: 0.3, ease: 'easeOut' } },
};

export const glowPulse: Variants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const blobAnimation: Variants = {
  hidden: { scale: 1, x: 0, y: 0 },
  visible: {
    scale: [1, 1.1, 0.95, 1.05, 1],
    x: [0, 30, -20, 15, 0],
    y: [0, -20, 30, -10, 0],
    transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const floatAnimation: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const scrollIndicator: Variants = {
  hidden: { opacity: 0, y: -5 },
  visible: {
    opacity: [0, 1, 0],
    y: [0, 8, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const counterAnimation = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const iconHover = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 360, scale: 1.2, transition: { duration: 0.5, ease: 'easeInOut' } },
};

export const gradientBorderGlow = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};
