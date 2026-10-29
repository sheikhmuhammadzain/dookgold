import { request } from './client';

export async function getTokenBalance(params: { chain: string; address: string; contractAddress: string; }) {
  return request<any>('GET', '/api/v1/token/balance', { auth: true, query: params });
}

export async function sendTokenTx(params: { chain: string; from: string; to: string; amount: string | number; contractAddress: string; }) {
  return request<any>('POST', '/api/v1/token/send', { auth: true, query: params });
}

export async function estimateTokenFee(params: { chain: string; from: string; to: string; amount: string | number; contractAddress: string; }) {
  return request<any>('GET', '/api/v1/token/estimate-fee', { auth: true, query: params });
}
