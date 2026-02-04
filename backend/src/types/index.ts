/**
 * Types partagés pour le backend Darkei Elyahou
 */

// Types pour les formulaires
export interface GalaFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  phoneCountryCode?: string;
  city: string;
  maleAttendees: number | string;
  femaleAttendees: number | string;
  totalAttendees?: number | string;
}

export interface SocialAidFormData {
  name?: string;
  phone?: string;
  city?: string;
  children?: string;
  aidType?: string;
  situation?: string;
}

export interface LoanRequestFormData {
  name?: string;
  phone?: string;
  amount?: string;
  loanPurpose?: string;
  availability?: string;
}

export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export type FormData = GalaFormData | SocialAidFormData | LoanRequestFormData | ContactFormData;

// Types pour les emails
export interface EmailAttachment {
  filename: string;
  content: string;
  type?: string;
  disposition?: 'inline' | 'attachment';
  content_id?: string;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  emailAttachments?: EmailAttachment[];
}

export interface SendEmailResult {
  data: { id?: string } | null;
  error: Error | null;
}

// Types pour les requêtes/réponses API
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  details?: string;
}

// Types pour la configuration
export interface AdminConfig {
  SESSION_SECRET: string;
  SESSION_MAX_AGE: number;
  JWT_SECRET?: string;
  JWT_EXPIRES_IN?: string;
}
