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

const API_BASE =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL ||
  'http://localhost:4000/api';

/**
 * 🔥 CORE FETCHER (FIXED)
 */
async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  // Set JSON header only if needed
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,

    // 🔥 CRITICAL FIXES
    credentials: 'include', // send cookies
    mode: 'cors',           // required for cross-domain
  });

  let data: any;

  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid JSON response from server');
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  // Handle ApiResponse wrapper
  if (data && typeof data === 'object' && 'success' in data) {
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    return data.data as T;
  }

  return data as T;
}

//
// AUTH
//
export const authApi = {
  login: (data: LoginDto) =>
    fetcher<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetcher<void>('/auth/logout', {
      method: 'POST',
    }),
};

//
// LEADS
//
export const leadsApi = {
  create: (data: CreateLeadDto) =>
    fetcher<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAll: (page = 1, limit = 50) =>
    fetcher<PaginatedResponse<Lead>>(
      `/leads?page=${page}&limit=${limit}`
    ),

  updateStatus: (id: string, status: string) =>
    fetcher<Lead>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

//
// ANALYTICS
//
export const analyticsApi = {
  track: (data: AnalyticsEventPayload) =>
    fetcher<void>('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getStats: () =>
    fetcher<AnalyticsStats>('/analytics/stats'),
};

//
// CMS: CASE STUDIES
//
export const caseStudiesApi = {
  getAll: (status?: string) =>
    fetcher<CaseStudy[]>(
      `/cms/case-studies${status ? `?status=${status}` : ''}`
    ),

  getBySlug: (slug: string) =>
    fetcher<CaseStudy>(`/cms/case-studies/${slug}`),

  create: (data: CreateCaseStudyDto) =>
    fetcher<CaseStudy>('/cms/case-studies', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateCaseStudyDto) =>
    fetcher<CaseStudy>(`/cms/case-studies/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  uploadCover: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);

    return fetcher<{ cover_image_url: string }>(
      `/cms/case-studies/${id}/cover`,
      {
        method: 'POST',
        body: fd,
        headers: {}, // let browser set boundary
      }
    );
  },
};

//
// CMS: TESTIMONIALS
//
export const testimonialsApi = {
  getAll: () =>
    fetcher<Testimonial[]>('/cms/testimonials'),

  create: (data: CreateTestimonialDto) =>
    fetcher<Testimonial>('/cms/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

//
// CMS: METRICS
//
export const metricsApi = {
  getAll: () =>
    fetcher<SiteMetric[]>('/cms/metrics'),

  update: (id: string, value: string) =>
    fetcher<SiteMetric>(`/cms/metrics/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ value }),
    }),
};

//
// CMS: CONTENT BLOCKS
//
export const contentBlocksApi = {
  getByPage: (page: string) =>
    fetcher<ContentBlock[]>(`/cms/content/${page}`),

  create: (data: CreateContentBlockDto) =>
    fetcher<ContentBlock>('/cms/content', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateContentBlockDto) =>
    fetcher<ContentBlock>(`/cms/content/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};
