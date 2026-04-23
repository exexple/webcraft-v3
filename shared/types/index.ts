// ============================================================
// WEBCRAFT STUDIO — Shared Type Definitions
// Used across gateway, services, and frontend (via API client)
// ============================================================

// ─── Common ─────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ─── Leads ──────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: LeadStatus;
  source?: string | null; // e.g. 'contact_form', 'hero_cta', 'footer_cta'
  created_at: string;
  updated_at: string;
}

export interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
}

export interface UpdateLeadDto {
  status: LeadStatus;
}

// ─── Analytics ──────────────────────────────────────────────

export type AnalyticsEvent = 'page_view' | 'cta_click' | 'form_submit' | 'scroll_depth';

export interface AnalyticsEventPayload {
  event: AnalyticsEvent;
  page: string;            // e.g. '/', '/services'
  metadata?: {
    label?: string;        // button label for CTA clicks
    depth?: number;        // scroll depth percentage
    duration?: number;     // time on page (ms)
    referrer?: string;
  };
  session_id?: string;
  ip_hash?: string;        // anonymized, server-side only
}

export interface AnalyticsStats {
  total_page_views: number;
  total_cta_clicks: number;
  top_pages: Array<{ page: string; count: number }>;
  top_ctas: Array<{ label: string; count: number }>;
  daily_views: Array<{ date: string; count: number }>;
}

// ─── CMS / Content ──────────────────────────────────────────

export interface ContentBlock {
  id: string;
  page: string;            // 'home', 'about', 'services', 'global'
  key: string;             // 'hero_headline', 'hero_subtext', 'philosophy_text'
  value: string;
  type: 'text' | 'rich_text' | 'url' | 'number';
  updated_at: string;
}

export interface CreateContentBlockDto {
  page: string;
  key: string;
  value: string;
  type?: ContentBlock['type'];
}

export interface UpdateContentBlockDto {
  value: string;
}

// ─── Case Studies ───────────────────────────────────────────

export type CaseStudyStatus = 'draft' | 'published';

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  tags: string[];
  cover_image_url?: string | null;
  problem: string;          // rich text / markdown
  solution: string;         // rich text / markdown
  result: string;           // rich text / markdown
  metrics?: CaseStudyMetric[];
  gallery_urls?: string[];
  status: CaseStudyStatus;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseStudyMetric {
  label: string;            // e.g. 'Conversion Rate'
  value: string;            // e.g. '+340%'
  description?: string;
}

export interface CreateCaseStudyDto {
  slug: string;
  title: string;
  client: string;
  industry: string;
  tags?: string[];
  problem: string;
  solution: string;
  result: string;
  metrics?: CaseStudyMetric[];
  status?: CaseStudyStatus;
}

export interface UpdateCaseStudyDto extends Partial<CreateCaseStudyDto> {
  cover_image_url?: string;
  gallery_urls?: string[];
  published_at?: string;
}

// ─── Testimonials ────────────────────────────────────────────

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  client_company: string;
  client_avatar_url?: string | null;
  quote: string;
  rating?: number;          // 1–5
  featured: boolean;
  display_order: number;
  created_at: string;
}

export interface CreateTestimonialDto {
  client_name: string;
  client_title: string;
  client_company: string;
  quote: string;
  rating?: number;
  featured?: boolean;
  display_order?: number;
}

// ─── Metrics (site-wide stats for homepage) ──────────────────

export interface SiteMetric {
  id: string;
  label: string;            // e.g. 'Projects Delivered'
  value: string;            // e.g. '120+'
  icon?: string;
  display_order: number;
}

// ─── Auth ────────────────────────────────────────────────────

export interface JwtPayload {
  sub: string;              // user id
  email: string;
  role: 'admin' | 'viewer';
  iat?: number;
  exp?: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}
