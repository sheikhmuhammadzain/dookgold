// Lightweight fetch client with auth + query helpers
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  query?: Record<string, any>;
  body?: any;
  auth?: boolean; // attach Bearer token
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

const TOKEN_KEY = 'dook-token';
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
};

export const setToken = (token?: string) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
};

const getBaseUrl = () => {
  const env = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  return env?.replace(/\/$/, '') || 'http://localhost:3000';
};

export const getApiBaseUrl = () => getBaseUrl();

const buildQuery = (params?: Record<string, any>) => {
  if (!params) return '';
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) sp.set(k, v.join(','));
    else sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
};

export async function request<T = any>(method: HttpMethod, path: string, opts: RequestOptions = {}): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}${buildQuery(opts.query)}`;

  const headers: Record<string, string> = {
    ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
    ...(opts.headers || {}),
  };
  if (opts.auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'include',
  });

  if (res.status === 204) return null as unknown as T;

  const contentType = res.headers.get('content-type') || '';
  let payload: any = null;
  try {
    if (contentType.includes('application/json')) {
      payload = await res.json();
    } else {
      // Try to read as text; if it looks like JSON, parse it
      const text = await res.text();
      try {
        payload = JSON.parse(text);
      } catch {
        payload = text; // plain text (e.g., redirect URL)
      }
    }
  } catch {
    // ignore, payload stays null
  }

  if (!res.ok) {
    const msg = payload?.message || payload?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return payload as T;
}
