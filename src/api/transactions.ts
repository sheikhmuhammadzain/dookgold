import { request } from './client';

export async function getBalance(chain: string, address: string) {
  return request<any>('GET', '/api/v1/transactions/balance', { auth: true, query: { chain, address } });
}

export async function sendTransaction(params: { chain: string; from: string; to: string; amount: string | number; }) {
  const { chain, from, to, amount } = params;
  return request<any>('POST', '/api/v1/transactions/send', { auth: true, query: { chain, from, to, amount } });
}

export async function estimateFee(params: { chain: string; from: string; to: string; amount: string | number; }) {
  const { chain, from, to, amount } = params;
  return request<any>('GET', '/api/v1/transactions/estimate-fee', { auth: true, query: { chain, from, to, amount } });
}
