import { request } from './client';

export type Fiat = 'usd' | 'pkr' | 'eur' | 'gbp' | 'jpy' | string;

export interface PriceMap { [fiat: string]: number }
export interface SinglePriceResponse { [coinId: string]: PriceMap }
export interface MultiPriceResponse { [coinId: string]: PriceMap }

export async function getSinglePrice(coin: string, currencies: string): Promise<SinglePriceResponse> {
  // coin expects symbol like BTC, ETH; currencies e.g. 'usd,pkr'
  return request<SinglePriceResponse>('GET', '/api/v1/crypto/price', {
    query: { coin, currencies },
  });
}

export async function getMultiplePrices(coins: string, currencies: string): Promise<MultiPriceResponse> {
  return request<MultiPriceResponse>('GET', '/api/v1/crypto/prices', {
    query: { coins, currencies },
  });
}
