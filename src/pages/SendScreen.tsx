import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Menu, Bell, QrCode, Search, ChevronRight, ArrowRightLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';
import { ActionCard } from '@/components/ui/ActionCard';

const COINS = [
  { symbol: 'BTC', name: 'Bitcoin', logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { symbol: 'ETH', name: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'USDT', name: 'Tether', logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'USDC', name: 'USD Coin', logo: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
  { symbol: 'BNB', name: 'BNB', logo: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png' },
  { symbol: 'SOL', name: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'XRP', name: 'XRP', logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  { symbol: 'ADA', name: 'Cardano', logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
  { symbol: 'DOGE', name: 'Dogecoin', logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
  { symbol: 'SHIB', name: 'Shiba Inu', logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
];

export const SendScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COINS;
    return COINS.filter(c => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <MobileContainer className="bg-background pb-24">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <Link to="/profile">
            <Menu className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-lg font-semibold text-white">{t('send')}</h1>
          <div className="flex items-center space-x-3">
            <Link to="/notifications/history" aria-label="Notifications">
              <Bell className="w-6 h-6 text-white" />
            </Link>
            <Link to="/qr" aria-label="App QR">
              <QrCode className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search + Coin list */}
      <div className="px-2 pt-3 pb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_coin')}
            className="pl-9 h-11"
          />
        </div>

        <div className="text-sm text-foreground-muted">{t('filter_by_crypto')}</div>

        {/* Quick Exchange action */}
        <ActionCard
          title={t('exchange')}
          description={t('exchange_any_coins')}
          icon={<ArrowRightLeft className="w-5 h-5 text-brand" />}
          onClick={() => navigate('/exchange/new')}
        />

        <div className="space-y-2">
          {filtered.map((c) => (
            <button
              key={c.symbol}
              className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80"
              onClick={() => {
                const crypto = {
                  symbol: c.symbol,
                  name: c.name,
                  balance: `0.00000000 ${c.symbol}`,
                  balanceUsd: '0.00 USD',
                  price: '—',
                  change: '+0.00',
                  changePercent: '+0.00%',
                  logoSrc: c.logo,
                  icon: c.symbol[0],
                  trend: 'up' as const,
                };
                navigate(`/send/${c.symbol}`, { state: { crypto } });
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={c.logo} alt={`${c.name} logo`} className="w-8 h-8 rounded-full object-contain bg-white border border-card-border" />
                <div className="min-w-0">
                  <div className="text-foreground font-medium leading-tight truncate">{c.name}</div>
                  <div className="text-foreground-muted text-xs">{c.symbol}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-foreground-muted" />
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </MobileContainer>
  );
};
