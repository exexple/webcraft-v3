'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * Invisible component that automatically tracks page views.
 * Place inside the root layout.
 */
export function AnalyticsTracker() {
  useAnalytics();
  return null;
}
