import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

interface CurrencyItem {
  symbol: string;
  name: string;
  logoSrc: string;
}

const ALL_CURRENCIES: CurrencyItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', logoSrc: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { symbol: 'ETH', name: 'Ethereum', logoSrc: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'USDT', name: 'Tether', logoSrc: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'USDC', name: 'USD Coin', logoSrc: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
  { symbol: 'BNB', name: 'BNB', logoSrc: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png' },
  { symbol: 'SOL', name: 'Solana', logoSrc: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'XRP', name: 'XRP', logoSrc: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  { symbol: 'ADA', name: 'Cardano', logoSrc: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
  { symbol: 'DOGE', name: 'Dogecoin', logoSrc: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
  { symbol: 'SHIB', name: 'Shiba Inu', logoSrc: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
];

export const CurrenciesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { t } = useI18n();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_CURRENCIES;
    return ALL_CURRENCIES.filter(c => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-card-border bg-card/50 backdrop-blur">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-md hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">{t('currencies')}</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Search */}
      <div className="p-4 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_currency_by_name_or_symbol')}
            className="pl-9 h-11"
            autoFocus
          />
        </div>
      </div>

      {/* List */}
      <div className="px-4 pb-4 space-y-2">
        {filtered.map((c) => (
          <button
            key={c.symbol}
            className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80"
            onClick={() =>
              navigate(`/market/${c.symbol}`, {
                state: {
                  crypto: {
                    symbol: c.symbol,
                    name: c.name,
                    balance: `0.00000000 ${c.symbol}`,
                    balanceUsd: '0.00 USD',
                    price: '—',
                    change: '+0.00',
                    changePercent: '+0.00%',
                    logoSrc: c.logoSrc,
                    icon: c.symbol[0],
                    trend: 'up',
                  },
                },
              })
            }
          >
            <div className="flex items-center gap-3 min-w-0">
              <img src={c.logoSrc} alt={`${c.name} logo`} className="w-8 h-8 rounded-full object-contain bg-white border border-card-border" />
              <div className="min-w-0">
                <div className="text-foreground font-medium leading-tight truncate">{c.name}</div>
                <div className="text-foreground-muted text-xs">{c.symbol}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-foreground-muted" />
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-sm text-foreground-muted py-8">{t('no_currencies_found')}</div>
        )}
      </div>
    </MobileContainer>
  );
};

export default CurrenciesScreen;
