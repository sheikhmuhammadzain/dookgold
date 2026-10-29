import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useI18n } from '@/contexts/I18nContext';

interface CoinItem {
  symbol: string;
  name: string;
  network?: string;
  logoSrc?: string;
}

const ALL_COINS: CoinItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin', logoSrc: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum', logoSrc: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'BNB', name: 'BNB', network: 'BNB Smart Chain', logoSrc: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { symbol: 'TRX', name: 'Tron', network: 'TRON', logoSrc: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png' },
  { symbol: 'LTC', name: 'Litecoin', network: 'Litecoin', logoSrc: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
  { symbol: 'POL', name: 'Polygon', network: 'Polygon PoS', logoSrc: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' },
  { symbol: 'BEP2', name: 'BNB Beacon Chain', network: 'BEP2', logoSrc: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { symbol: 'SOL', name: 'Solana', network: 'Solana', logoSrc: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'USDT', name: 'USDT', network: 'Multi', logoSrc: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'USDC', name: 'USDC', network: 'Multi', logoSrc: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
  { symbol: 'BCH', name: 'Bitcoin Cash', network: 'Bitcoin Cash', logoSrc: 'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png' },
  { symbol: 'DCR', name: 'Decred', network: 'Decred', logoSrc: 'https://assets.coingecko.com/coins/images/329/small/decred.png' },
];

const STORAGE_KEY = 'dook-visible-coins';

export const ManageCoinsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const { t } = useI18n();

  // Load saved preferences
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setVisible(new Set(JSON.parse(raw) as string[]));
      } else {
        setVisible(new Set(ALL_COINS.map((c) => c.symbol)));
      }
    } catch {
      setVisible(new Set(ALL_COINS.map((c) => c.symbol)));
    }
  }, []);

  // Persist to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(visible)));
  }, [visible]);

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!s) return ALL_COINS;
    return ALL_COINS.filter((c) => c.symbol.toLowerCase().includes(s) || c.name.toLowerCase().includes(s) || (c.network || '').toLowerCase().includes(s));
  }, [query]);

  function toggle(symbol: string) {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  }

  function setAll(on: boolean) {
    setVisible(new Set(on ? ALL_COINS.map((c) => c.symbol) : []));
  }

  function openCoin(c: CoinItem) {
    // Navigate to Market screen with minimal crypto state
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
    });
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('manage_coins')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search_coin_or_network')} className="pl-9" />
        </div>

        {/* Quick toggles */}
        <div className="flex items-center gap-2">
          <button className="text-sm px-3 py-1 rounded-lg border border-card-border bg-card" onClick={() => setAll(true)}>{t('enable_all')}</button>
          <button className="text-sm px-3 py-1 rounded-lg border border-card-border bg-card" onClick={() => setAll(false)}>{t('disable_all')}</button>
        </div>

        {/* List */}
        <div className="rounded-xl border border-card-border bg-card divide-y">
          {filtered.map((c) => (
            <div key={c.symbol} className="flex items-center justify-between px-3 py-3">
              <button
                type="button"
                onClick={() => openCoin(c)}
                className="flex items-center gap-3 text-left active:opacity-80"
              >
                {c.logoSrc ? (
                  <img src={c.logoSrc} alt={`${c.name} logo`} className="w-8 h-8 rounded-full bg-white" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center text-sm">{c.symbol[0]}</div>
                )}
                <div className="text-left">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <span className="text-foreground-muted px-2 py-0.5 rounded-md border border-card-border text-[11px]">{c.network || t('network')}</span>
                    <span className="font-semibold">{c.symbol}</span>
                  </div>
                  <div className="text-xs text-foreground-muted">{c.name}</div>
                </div>
              </button>
              <Switch checked={visible.has(c.symbol)} onCheckedChange={() => toggle(c.symbol)} onClick={(e) => e.stopPropagation()} />
            </div>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};

export default ManageCoinsScreen;
