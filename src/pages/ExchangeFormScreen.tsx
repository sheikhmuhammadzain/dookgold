import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, ArrowRightLeft, ChevronDown, Search, Repeat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';

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

export const ExchangeFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();

  const [from, setFrom] = useState('USDT');
  const [to, setTo] = useState('BTC');
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COINS;
    return COINS.filter(c => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query]);

  const rate = 0.0000853; // mock rate

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }

  function handleSubmit() {
    if (!fromAmount || Number(fromAmount) <= 0) {
      toast({ title: t('exchange'), description: t('enter_amount') || 'Enter amount' });
      return;
    }
    toast({ title: t('exchange_completed'), description: `${fromAmount} ${from} → ~${toAmount || (Number(fromAmount) * rate).toFixed(6)} ${to}` });
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="grid grid-cols-3 items-center">
          <button onClick={() => navigate(-1)} aria-label="Back" className="justify-self-start p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white text-center">{t('exchange')}</h1>
          <div className="w-6 h-6 justify-self-end" />
        </div>
      </div>

      {/* Form */}
      <div className="p-3 space-y-4">
        {/* From */}
        <div className="rounded-xl border border-card-border bg-card p-3 space-y-2">
          <div className="text-sm font-medium">{t('from')}</div>
          <div className="flex items-center gap-2">
            <Input
              inputMode="decimal"
              placeholder={t('amount')}
              value={fromAmount}
              onChange={(e) => {
                const v = e.target.value;
                setFromAmount(v);
                const n = Number(v || 0);
                setToAmount(n ? (n * rate).toFixed(6) : '');
              }}
            />
            <button
              className="flex items-center gap-1 px-2 h-11 rounded-md border border-card-border bg-background"
              onClick={() => { setQuery(''); setFromOpen(true); }}
            >
              <span className="font-medium">{from}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* To */}
        <div className="rounded-xl border border-card-border bg-card p-3 space-y-2">
          <div className="text-sm font-medium">{t('to')}</div>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              placeholder={t('amount')}
              value={toAmount}
            />
            <button
              className="flex items-center gap-1 px-2 h-11 rounded-md border border-card-border bg-background"
              onClick={() => { setQuery(''); setToOpen(true); }}
            >
              <span className="font-medium">{to}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rate + Swap */}
        <div className="rounded-xl border border-card-border bg-card p-3 flex items-center justify-between">
          <div className="text-sm text-foreground-muted">
            1 {from} ≈ {(rate).toFixed(8)} {to}
          </div>
          <button className="p-2 rounded-md border border-card-border" onClick={handleSwap} aria-label="Swap">
            <Repeat className="w-4 h-4 text-brand" />
          </button>
        </div>

        <Button className="w-full h-11" onClick={handleSubmit}>
          <ArrowRightLeft className="w-4 h-4 mr-2" /> {t('exchange')}
        </Button>
      </div>

      {/* From picker */}
      <Sheet open={fromOpen} onOpenChange={setFromOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 pb-8">
          <SheetHeader>
            <SheetTitle>{t('from')} - {t('select_coin')}</SheetTitle>
          </SheetHeader>
          <div className="space-y-3 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search_coin')} className="pl-9 h-11" />
            </div>
            <div className="space-y-2 max-h-[55vh] overflow-y-auto">
              {filtered.map((c) => (
                <button key={c.symbol} className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80" onClick={() => { setFrom(c.symbol); setFromOpen(false); }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={c.logo} alt={`${c.name} logo`} className="w-8 h-8 rounded-full object-contain bg-white border border-card-border" />
                    <div className="min-w-0">
                      <div className="text-foreground font-medium leading-tight truncate">{c.name}</div>
                      <div className="text-foreground-muted text-xs">{c.symbol}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* To picker */}
      <Sheet open={toOpen} onOpenChange={setToOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 pb-8">
          <SheetHeader>
            <SheetTitle>{t('to')} - {t('select_coin')}</SheetTitle>
          </SheetHeader>
          <div className="space-y-3 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search_coin')} className="pl-9 h-11" />
            </div>
            <div className="space-y-2 max-h-[55vh] overflow-y-auto">
              {filtered.map((c) => (
                <button key={c.symbol} className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80" onClick={() => { setTo(c.symbol); setToOpen(false); }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={c.logo} alt={`${c.name} logo`} className="w-8 h-8 rounded-full object-contain bg-white border border-card-border" />
                    <div className="min-w-0">
                      <div className="text-foreground font-medium leading-tight truncate">{c.name}</div>
                      <div className="text-foreground-muted text-xs">{c.symbol}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </MobileContainer>
  );
};

export default ExchangeFormScreen;
