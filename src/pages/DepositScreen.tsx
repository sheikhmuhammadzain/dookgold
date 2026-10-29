import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Menu, Bell, QrCode, Search, ChevronRight, ArrowRightLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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

export const DepositScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'receive' | 'buy'>('receive');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [lastSymbol, setLastSymbol] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COINS;
    return COINS.filter(c => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    try {
      const ls = localStorage.getItem('dook-last-coin');
      if (ls) setLastSymbol(ls);
    } catch {}
  }, []);

  function go(modeSel: 'receive' | 'buy', coinSym: string) {
    const coin = COINS.find(c => c.symbol === coinSym) || { symbol: coinSym, name: coinSym, logo: '' };
    const crypto = {
      symbol: coin.symbol,
      name: coin.name,
      balance: `0.00000000 ${coin.symbol}`,
      balanceUsd: '0.00 USD',
      price: '—',
      change: '+0.00',
      changePercent: '+0.00%',
      logoSrc: coin.logo,
      icon: coin.symbol[0],
      trend: 'up' as const,
    };
    // Navigate directly to the asset-specific Deposit screen; OTP will be handled inside the form
    navigate(`/deposit/${coin.symbol}`, { state: { crypto } });
  }

  return (
    <MobileContainer className="bg-background pb-24">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <Link to="/profile">
            <Menu className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-lg font-semibold text-white">{t('deposit')}</h1>
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

        {/* Segmented: Receive / Buy */}
        <div className="rounded-xl border border-card-border bg-card p-1 flex">
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === 'receive' ? 'bg-brand text-white' : 'text-foreground-muted'}`}
            onClick={() => {
              setMode('receive');
              const sym = lastSymbol || 'BTC';
              go('receive', sym);
            }}
          >
            {t('receive')}
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === 'buy' ? 'bg-brand text-white' : 'text-foreground-muted'}`}
            onClick={() => {
              setMode('buy');
              // For Buy, show coin picker first so user chooses what to buy
              setPickerOpen(true);
            }}
          >
            {t('buy')}
          </button>
        </div>

        {/* Quick Exchange action */}
        <ActionCard
          title={t('exchange')}
          description={t('exchange_any_coins')}
          icon={<ArrowRightLeft className="w-5 h-5 text-brand" />}
          onClick={() => navigate('/exchange/new')}
        />

        <div className="text-sm text-foreground-muted">{t('your_coins')}</div>

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
                // Navigate directly to Deposit detail screen; OTP will be handled inside the form
                navigate(`/deposit/${c.symbol}`, { state: { crypto } });
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

      {/* Coin Picker Sheet */}
      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 pb-8">
          <SheetHeader>
            <SheetTitle>{mode === 'receive' ? t('receive') : t('buy')} - {t('select_coin')}</SheetTitle>
          </SheetHeader>

          <div className="space-y-3 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_coin')}
                className="pl-9 h-11"
              />
            </div>

            <div className="space-y-2 max-h-[55vh] overflow-y-auto">
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
                    setPickerOpen(false);
                    try { localStorage.setItem('dook-last-coin', c.symbol); setLastSymbol(c.symbol); } catch {}
                    // Navigate directly to Deposit detail screen; OTP will be handled inside the form
                    navigate(`/deposit/${c.symbol}`, { state: { crypto } });
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
        </SheetContent>
      </Sheet>

      <BottomNavigation />
    </MobileContainer>
  );
};
