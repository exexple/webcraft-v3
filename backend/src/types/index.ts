export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'converted';
  source: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Interaction {
  id: string;
  lead_id: string;
  note: string;
  type: 'call' | 'whatsapp' | 'email' | 'meeting';
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface AdminLoginData {
  email: string;
  password: string;
}
