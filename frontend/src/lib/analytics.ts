import { analyticsApi } from './api';
import type { AnalyticsEventPayload } from '@webcraft/shared/types';

/**
 * Fires an analytics event to the Analytics microservice.
 * We use `catch` to make this a true fire-and-forget operation,
 * ensuring tracking errors never break the UI.
 */
export function trackEvent(payload: AnalyticsEventPayload) {
  // Add a unique session ID per tab/window
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('wc_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('wc_session_id', sessionId);
    }
    payload.session_id = sessionId;
  }

  analyticsApi.track(payload).catch((err) => {
    // Silently fail in production, log in dev
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics tracking failed:', err);
    }
  });
}
