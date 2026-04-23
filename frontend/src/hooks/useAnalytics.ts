'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

/**
 * Hook to automatically track page views on route changes.
 * Place this in the root layout or specific page components.
 */
export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Track page view
    trackEvent({
      event: 'page_view',
      page: pathname,
    });
  }, [pathname]);

  return {
    trackCtaClick: (label: string) => {
      trackEvent({
        event: 'cta_click',
        page: pathname || 'unknown',
        metadata: { label },
      });
    },
  };
}
