import { request } from './client';

export async function getCheckoutUrl(walletAddress: string, currency: string = 'usd'): Promise<string> {
  // Backend returns a redirect URL string; our client handles text payloads.
  return request<string>('GET', '/api/v1/moonpay/checkout', {
    query: { walletAddress, currency },
    auth: true,
  });
}

export async function getSellUrl(walletAddress: string, currency: string = 'usd'): Promise<string> {
  return request<string>('GET', '/api/v1/moonpay/sell', {
    query: { walletAddress, currency },
    auth: true,
  });
}
