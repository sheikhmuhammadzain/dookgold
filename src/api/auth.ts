import { request, getApiBaseUrl } from './client';

export interface SignupBody {
  email: string;
  name: string;
  password: string;
  wallets?: any[];
  mnemonic?: string | null;
}

export interface LoginBody {
  email: string;
  password: string;
}

interface TokenResponse { success: boolean; message: string; data: string } // data = jwt token

export async function signup(body: SignupBody): Promise<string> {
  const res = await request<TokenResponse>('POST', '/api/auth/signup', { body });
  return res?.data;
}

export async function login(body: LoginBody): Promise<string> {
  const res = await request<TokenResponse>('POST', '/api/auth/login', { body });
  return res?.data;
}

export function startGoogleOAuth() {
  // Redirect user to backend Google OAuth start (absolute to support production & local)
  const base = getApiBaseUrl();
  const normalized = String(base || '').replace(/\/$/, '') || window.location.origin;
  window.location.href = `${normalized}/api/auth/google`;
}
