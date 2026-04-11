import { Variants } from 'framer-motion';

// ─── Animation Configuration ─────────────────────────────────────────────────

export const animationConfig = {
  // Durations (seconds)
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,

  // Easing functions
  easing: {
    easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
    easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
    easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
    cubic: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    smooth: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
};

/** Returns a near-zero duration when the user prefers reduced motion. */
export const getAnimationDuration = (duration: number): number => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 0.01;
  }
  return duration;
};

// ─── Fade / Slide Variants (initial → animate) ───────────────────────────────

export const fadeInVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUpVariant: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: animationConfig.normal, ease: animationConfig.easing.easeOut },
  },
};

export const slideDownVariant: Variants = {
  initial: { opacity: 0, y: -40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: animationConfig.normal, ease: animationConfig.easing.easeOut },
  },
};

export const slideLeftVariant: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: animationConfig.normal, ease: animationConfig.easing.easeOut },
  },
};

export const slideRightVariant: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: animationConfig.normal, ease: animationConfig.easing.easeOut },
  },
};

export const scaleInVariant: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: animationConfig.normal, ease: animationConfig.easing.easeOut },
  },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────

/** Stagger for grouped entrance animations (e.g. hero content). */
export const staggerContainerVariant: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/** Stagger triggered by scroll entering the viewport. */
export const staggerScrollVariant: Variants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ─── Scroll-triggered Variants ───────────────────────────────────────────────

export const fadeInOnScrollVariant: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: animationConfig.normal },
  },
};

export const slideUpOnScrollVariant: Variants = {
  initial: { opacity: 0, y: 60 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.normal,
      ease: animationConfig.easing.easeOut,
    },
  },
};

// ─── Hover / Interaction Variants ────────────────────────────────────────────

export const hoverScaleVariant = {
  initial: { scale: 1 },
  whileHover: { scale: 1.02 },
  transition: { duration: animationConfig.fast, ease: animationConfig.easing.easeOut },
};

export const glowHoverVariant = {
  initial: { boxShadow: '0 0 0px rgba(6, 182, 212, 0)' },
  whileHover: { boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' },
  transition: { duration: animationConfig.fast },
};

export const premiumHoverVariant = {
  initial: { scale: 1, boxShadow: '0 0 0px rgba(6, 182, 212, 0)' },
  whileHover: {
    scale: 1.02,
    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
    y: -4,
  },
  transition: { duration: animationConfig.fast, ease: animationConfig.easing.easeOut },
};

export const rotateHoverVariant = {
  initial: { rotate: 0 },
  whileHover: { rotate: 360 },
  transition: { duration: 0.6, ease: animationConfig.easing.smooth },
};

export const buttonPressVariant = {
  initial: { scale: 1 },
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: animationConfig.fast },
};

// ─── Legacy Variants (hidden/visible) — kept for backward compatibility ───────

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
