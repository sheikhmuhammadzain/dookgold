import { request } from './client';

export interface UserDTO {
  id?: number;
  email: string;
  name: string;
  password?: string; // hashed on server
  wallets?: Array<{
    id: number;
    chainType: string;
    publicAddress: string;
    publicKey?: string;
  }>
  mnemonic?: string | null;
}

export async function getUsers(page = 0, size = 10) {
  return request<UserDTO[]>('GET', '/api/v1/users', { auth: true, query: { page, size } });
}

export async function getUserById(id: number | string) {
  return request<UserDTO>('GET', `/api/v1/users/${id}`, { auth: true });
}

export async function searchUsers(keyword: string, page = 0, size = 10) {
  return request<UserDTO[]>('GET', '/api/v1/users/search', { auth: true, query: { keyword, page, size } });
}

export async function getUsersCount() {
  return request<number>('GET', '/api/v1/users/count', { auth: true });
}

export async function updateUser(id: number | string, payload: Partial<UserDTO>) {
  return request<UserDTO>('PUT', `/api/v1/users/${id}`, { auth: true, body: payload });
}

export async function deleteUser(id: number | string) {
  return request<void>('DELETE', `/api/v1/users/${id}`, { auth: true });
}

export async function getAdminStats() {
  return request<{ totalUsers: number; activeUsers: number; totalTransactions: number; todayRegistrations: number }>('GET', '/api/v1/admin/stats', { auth: true });
}

export async function getSystemHealth() {
  return request<{ status: string; database: string; redis?: string; timestamp: string }>('GET', '/api/v1/admin/health', { auth: true });
}
