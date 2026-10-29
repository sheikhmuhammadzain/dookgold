import { request } from './client';

export interface WalletDTO {
  id: number;
  chainType: string;
  publicAddress: string;
  publicKey?: string;
}

export async function getCurrentUserWallets() {
  return request<{ success: boolean; message: string; data: WalletDTO[] }>('GET', '/api/v1/wallets', { auth: true });
}

export async function getWalletAddressByUserAndChain(userId: number | string, chainName: string) {
  return request<any>('GET', '/api/v1/wallets/address', { auth: true, query: { userId, chainName } });
}

export async function getWalletsByUserId(userId: number | string) {
  return request<any>('GET', `/api/v1/wallets/user/${userId}`, { auth: true });
}

export async function deleteWallet(id: number | string) {
  return request<{ success: boolean; message: string; data: null }>('DELETE', `/api/v1/wallets/${id}`, { auth: true });
}
