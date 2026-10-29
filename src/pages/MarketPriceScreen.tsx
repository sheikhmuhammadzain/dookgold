import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, ArrowDownToLine, ArrowRightLeft, Send, Plus, Copy } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, XAxis, YAxis, ReferenceLine, ReferenceDot } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/contexts/I18nContext';
import { getSinglePrice } from '@/api/crypto';

interface CryptoState {
  symbol: string;
  name: string;
  price: string; // e.g., "110733.92 USD"
  change: string; // e.g., "+677.38"
  changePercent: string; // e.g., "+18.74%"
  logoSrc?: string;
  icon?: string;
  balance?: string;
  balanceUsd?: string;
}

const makeMockData = (points = 24) =>
  Array.from({ length: points }, (_, i) => ({ idx: i, value: 80 + Math.sin(i / 2) * 10 + Math.random() * 6 }));

function symbolToCoingeckoId(symbol?: string) {
  switch ((symbol || '').toUpperCase()) {
    case 'BTC':
      return 'bitcoin';
    case 'ETH':
      return 'ethereum';
    case 'USDT':
      return 'tether';
    case 'USDC':
      return 'usd-coin';
    case 'SHIB':
      return 'shiba-inu';
    default:
      return undefined;
  }
}

export const MarketPriceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const [range, setRange] = useState<'day' | 'week' | 'month' | 'year' | 'all'>('month');
  const { t } = useI18n();

  const crypto: CryptoState | undefined = state?.crypto;
  const symbol = crypto?.symbol || params.symbol || 'ASSET';
  const name = crypto?.name || symbol;

  const coinId = symbolToCoingeckoId(symbol);
  const days = range === 'day' ? 1 : range === 'week' ? 7 : range === 'month' ? 30 : range === 'year' ? 365 : 'max';
  const interval = typeof days === 'number' && days <= 7 ? 'hourly' : 'daily';

  const { data: apiData } = useQuery({
    queryKey: ['market_chart', coinId, days, interval],
    queryFn: async () => {
      if (!coinId) return null;
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch market data');
      return res.json();
    },
    staleTime: 1000 * 60, // 1 minute
  });

  // Live price from backend Crypto Price API (public)
  const { data: priceResp } = useQuery({
    queryKey: ['single_price', symbol, 'usd'],
    queryFn: async () => {
      if (!symbol) return null;
      return getSinglePrice(symbol, 'usd');
    },
    staleTime: 1000 * 30, // 30s
    enabled: !!symbol,
  });

  const usdPrice = useMemo(() => {
    if (!priceResp) return undefined as number | undefined;
    const first = Object.values(priceResp)[0] as Record<string, number> | undefined;
    return first?.usd;
  }, [priceResp]);

  const data = useMemo(() => {
    const prices: [number, number][] | undefined = apiData?.prices;
    if (prices && prices.length) {
      return prices.map(([_, p], idx) => ({ idx, value: p }));
    }
    // Fallback to mock data when API is not available yet
    switch (range) {
      case 'day':
        return makeMockData(24);
      case 'week':
        return makeMockData(7);
      case 'month':
        return makeMockData(30);
      case 'year':
        return makeMockData(52);
      case 'all':
        return makeMockData(60);
    }
  }, [apiData, range]);

  const isUp = (crypto?.change || '').trim().startsWith('+');

  const walletAddress = useMemo(() => {
    const base = btoa(`${symbol}-wallet`).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);
    return `0x${base.toLowerCase()}`;
  }, [symbol]);

  const shortAddress = (addr: string) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '');

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // noop
    }
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            {crypto?.logoSrc ? (
              <img src={crypto.logoSrc} alt={`${name} logo`} className="w-6 h-6 rounded-full bg-white" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white text-gray-700 flex items-center justify-center text-xs">
                {crypto?.icon || symbol?.[0]}
              </div>
            )}
            <h1 className="text-lg font-semibold text-white">{symbol}</h1>
          </div>
          <div className="w-6 h-6" />
        </div>
      </div>

      {/* Market price and chart */
      }
      <div className="p-3 space-y-3">
        <div className="text-center">
          <div className="text-xs text-foreground-muted">{t('market_price')}</div>
          <div className="text-3xl font-bold text-brand">
            {usdPrice !== undefined
              ? usdPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              : (crypto?.price || '—')}
          </div>
          <div className={`text-sm ${isUp ? 'text-success' : 'text-error'}`}>
            {crypto?.change || '—'} ({crypto?.changePercent || '—'})
          </div>
        </div>

          {/* Full-bleed chart, no border/background, taller height */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-[100vw]">
          <ChartContainer
            config={{ price: { label: t('price_label'), color: '#6B21A8' } }}
            className="h-52 w-full aspect-auto"
          >
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B21A8" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#6B21A8" stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="idx"
                type="number"
                scale="linear"
                domain={[0, (data?.length ?? 1) - 1]}
                hide
                padding={{ left: 0, right: 0 }}
                allowDecimals={false}
                allowDataOverflow
              />
              <YAxis domain={[0, 'auto']} hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              {/* Subtle average baseline */}
              {data && data.length ? (
                <ReferenceLine
                  y={data.reduce((s, d) => s + d.value, 0) / data.length}
                  stroke="#6B21A8"
                  strokeOpacity={0.2}
                  strokeDasharray="3 3"
                />
              ) : null}
              <Area type="monotone" dataKey="value" stroke="#6B21A8" strokeOpacity={1} fill="url(#priceGradient)" strokeWidth={2.5} />
              {/* Min/Max dots */}
              {data && data.length ? (() => {
                let minI = 0, maxI = 0;
                for (let i = 1; i < data.length; i++) {
                  if (data[i].value < data[minI].value) minI = i;
                  if (data[i].value > data[maxI].value) maxI = i;
                }
                return (
                  <>
                    <ReferenceDot x={data[minI].idx} y={data[minI].value} r={3} fill="#fff" stroke="#6B21A8" strokeWidth={2} />
                    <ReferenceDot x={data[maxI].idx} y={data[maxI].value} r={3} fill="#fff" stroke="#6B21A8" strokeWidth={2} />
                  </>
                );
              })() : null}
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Range selector */}
        <div className="flex items-center justify-between rounded-xl border border-card-border bg-card p-1">
          {(['day','week','month','year','all'] as const).map((r) => (
            <button
              key={r}
              className={`flex-1 text-sm py-1 rounded-md ${r===range ? 'bg-brand/10 text-brand font-medium' : 'text-foreground-muted'}`}
              onClick={() => setRange(r)}
            >
              {r === 'day' ? t('day') : r === 'week' ? t('week') : r === 'month' ? t('month') : r === 'year' ? t('year') : t('all')}
            </button>
          ))}
        </div>

        {/* Your wallet */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {crypto?.logoSrc ? (
              <img src={crypto.logoSrc} alt={`${name} logo`} className="w-8 h-8 rounded-full bg-white" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center text-sm">
                {crypto?.icon || symbol?.[0]}
              </div>
            )}
            <div>
              <div className="text-sm font-medium">{t('your_wallet')}</div>
              <div className="text-xs text-foreground-muted flex items-center gap-2">
                <span>{shortAddress(walletAddress)}</span>
                <button onClick={() => copyToClipboard(walletAddress)} className="p-1 -m-1" aria-label="Copy address">
                  <Copy className="w-3.5 h-3.5 text-brand" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{crypto?.balance || `0.00000000 ${symbol}`}</div>
            <div className="text-xs text-foreground-muted">{crypto?.balanceUsd || '0.00 USD'}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-xl border border-card-border bg-card divide-y">
          <Link to={`/deposit/${symbol}`} state={{ crypto }} className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-3">
              <ArrowDownToLine className="w-5 h-5 text-brand" />
              <div>
                <div className="text-sm font-medium">{t('deposit')} {name}</div>
                <div className="text-xs text-foreground-muted">{t('top_up_your_wallet')}</div>
              </div>
            </div>
            <span className="text-foreground-muted">›</span>
          </Link>
          <Link to={`/send/${symbol}`} state={{ crypto }} className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5 text-brand" />
              <div>
                <div className="text-sm font-medium">{t('send')} {name}</div>
                <div className="text-xs text-foreground-muted">{t('transfer_to_any_wallet')}</div>
              </div>
            </div>
            <span className="text-foreground-muted">›</span>
          </Link>
          <Link to="/exchange" className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-5 h-5 text-brand" />
              <div>
                <div className="text-sm font-medium">{t('exchange')} {name}</div>
                <div className="text-xs text-foreground-muted">{t('exchange_any_coins')}</div>
              </div>
            </div>
            <span className="text-foreground-muted">›</span>
          </Link>
          <Link to="/history" className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-3">
              <HistoryIcon className="w-5 h-5 text-brand" />
              <div>
                <div className="text-sm font-medium">{t('history')}</div>
                <div className="text-xs text-foreground-muted">{t('show_all_transactions')}</div>
              </div>
            </div>
            <span className="text-foreground-muted">›</span>
          </Link>
        </div>

        {/* Quick Buy (optional) */}
        <Link to={`/deposit/${symbol}`} state={{ crypto }} className="flex items-center justify-center gap-2 h-11 rounded-xl bg-brand text-white font-medium">
          <Plus className="w-4 h-4" /> {t('buy')} {name}
        </Link>
      </div>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default MarketPriceScreen;
