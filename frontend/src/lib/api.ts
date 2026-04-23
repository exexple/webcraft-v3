import type {
  ApiResponse,
  PaginatedResponse,
  CreateLeadDto,
  Lead,
  AnalyticsEventPayload,
  AnalyticsStats,
  ContentBlock,
  CreateContentBlockDto,
  UpdateContentBlockDto,
  CaseStudy,
  CreateCaseStudyDto,
  UpdateCaseStudyDto,
  Testimonial,
  CreateTestimonialDto,
  SiteMetric,
  LoginDto,
  AuthResponse
} from '@webcraft/shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:4000/api';

/**
 * Base API fetcher with auth handling
 */
async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  // Only set JSON content type if it's not a FormData payload
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add auth token if available (client-side only)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('wc_admin_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'API request failed');
  }

  // Handle standard ApiResponse wrapper
  if (data && typeof data === 'object' && 'success' in data) {
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    return data.data as T;
  }

  return data as T;
}

// ─────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────
export const authApi = {
  login: (data: LoginDto) => fetcher<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ─────────────────────────────────────────────────────────────
// Leads
// ─────────────────────────────────────────────────────────────
export const leadsApi = {
  create: (data: CreateLeadDto) => fetcher<Lead>('/leads', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getAll: (page = 1, limit = 50) => fetcher<PaginatedResponse<Lead>>(`/leads?page=${page}&limit=${limit}`),
  updateStatus: (id: string, status: string) => fetcher<Lead>(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
};

// ─────────────────────────────────────────────────────────────
// Analytics
// ─────────────────────────────────────────────────────────────
export const analyticsApi = {
  track: (data: AnalyticsEventPayload) => fetcher<void>('/analytics/track', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getStats: () => fetcher<AnalyticsStats>('/analytics/stats'),
};

// ─────────────────────────────────────────────────────────────
// CMS: Case Studies
// ─────────────────────────────────────────────────────────────
export const caseStudiesApi = {
  getAll: (status?: string) => fetcher<CaseStudy[]>(`/cms/case-studies${status ? `?status=${status}` : ''}`),
  getBySlug: (slug: string) => fetcher<CaseStudy>(`/cms/case-studies/${slug}`),
  create: (data: CreateCaseStudyDto) => fetcher<CaseStudy>('/cms/case-studies', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: UpdateCaseStudyDto) => fetcher<CaseStudy>(`/cms/case-studies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  uploadCover: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return fetcher<{ cover_image_url: string }>(`/cms/case-studies/${id}/cover`, {
      method: 'POST',
      body: fd,
      // Delete Content-Type so browser sets boundary for multipart/form-data
      headers: typeof window !== 'undefined' && localStorage.getItem('wc_admin_token') 
        ? { 'Authorization': `Bearer ${localStorage.getItem('wc_admin_token')}` } 
        : {},
    });
  }
};

// ─────────────────────────────────────────────────────────────
// CMS: Testimonials
// ─────────────────────────────────────────────────────────────
export const testimonialsApi = {
  getAll: () => fetcher<Testimonial[]>('/cms/testimonials'),
  create: (data: CreateTestimonialDto) => fetcher<Testimonial>('/cms/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ─────────────────────────────────────────────────────────────
// CMS: Metrics
// ─────────────────────────────────────────────────────────────
export const metricsApi = {
  getAll: () => fetcher<SiteMetric[]>('/cms/metrics'),
  update: (id: string, value: string) => fetcher<SiteMetric>(`/cms/metrics/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ value }),
  }),
};

// ─────────────────────────────────────────────────────────────
// CMS: Content Blocks
// ─────────────────────────────────────────────────────────────
export const contentBlocksApi = {
  getByPage: (page: string) => fetcher<ContentBlock[]>(`/cms/content/${page}`),
  create: (data: CreateContentBlockDto) => fetcher<ContentBlock>('/cms/content', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: UpdateContentBlockDto) => fetcher<ContentBlock>(`/cms/content/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
};
