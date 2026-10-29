import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Menu, Bell, QrCode, SlidersHorizontal, ChevronRight, Search, ArrowDownCircle, ArrowUpCircle, ArrowDownRight, ArrowUpRight, Shuffle, RotateCcw, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyActions } from '@/components/ui/EmptyActions';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';

export const HistoryScreen: React.FC = () => {
  // Start empty to match the requested empty-state
  const items: Array<{ id: number; title: string; amount: string; date: string }> = [];
  const { t } = useI18n();

  // Filters state
  const [filterOpen, setFilterOpen] = useState(false);
  const [coinPicker, setCoinPicker] = useState(false);
  const [opPicker, setOpPicker] = useState(false);
  const [periodPicker, setPeriodPicker] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<{ symbol: string; name: string; logo: string } | null>(null);
  const [q, setQ] = useState('');
  const [operationKey, setOperationKey] = useState<'all' | 'deposit' | 'withdrawal' | 'incoming' | 'outgoing' | 'exchanged' | 'rollback'>('all');
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState<null | 'from' | 'to'>(null);
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth()); // 0-11
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  const [tempDate, setTempDate] = useState<Date>(new Date());

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

  const filteredCoins = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COINS;
    return COINS.filter(c => c.symbol.toLowerCase().includes(s) || c.name.toLowerCase().includes(s));
  }, [q]);

  const OP_LABEL: Record<typeof operationKey, string> = {
    all: t('all_transactions'),
    deposit: t('deposit'),
    withdrawal: t('withdrawal'),
    incoming: t('incoming'),
    outgoing: t('outgoing'),
    exchanged: t('exchanged'),
    rollback: t('rollback'),
  } as const;

  function fmtDate(d: Date) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
  }

  function monthLabel(y: number, m: number) {
    return new Date(y, m, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' });
  }

  return (
    <MobileContainer className="bg-background pb-24">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <Link to="/profile">
            <Menu className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-lg font-semibold text-white">{t('history')}</h1>
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

      {/* Filter bar */}
      <div className="px-2 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-card border border-card-border text-foreground flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/60" />
            {OP_LABEL[operationKey]}
          </span>
          {selectedCoin && (
            <span className="text-xs px-2 py-1 rounded-full bg-card border border-card-border text-foreground">
              {selectedCoin.symbol}
            </span>
          )}
        </div>
        <button
          onClick={() => { setFilterOpen(true); setCoinPicker(false); }}
          aria-label={t('filters')}
          className="p-2 rounded-lg border border-card-border bg-card"
        >
          <SlidersHorizontal className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <EmptyActions
          icon={<span className="text-2xl">🔄</span>}
          title={t('no_operations')}
          subtitle={t('all_transactions_shown_here')}
        />
      )}

      <BottomNavigation />

      {/* Filters Sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0">
          {!coinPicker && !opPicker && !periodPicker ? (
            <div className="p-4 pb-6">
              {/* Header row inside sheet */}
              <div className="flex items-center justify-between">
                <button onClick={() => setFilterOpen(false)} aria-label="Close" className="p-2 -ml-2 rounded-md hover:bg-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="flex items-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-semibold">{t('filters')}</span>
                </div>
                <div className="w-8" />
              </div>

              <div className="mt-4 space-y-3">
                {/* Coin */}
                <div className="text-xs text-foreground-muted">{t('coin')}:</div>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-card border border-card-border"
                  onClick={() => setCoinPicker(true)}
                >
                  <div className="flex items-center gap-3">
                    {/* coin icon placeholder */}
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                      <span className="text-brand text-sm">🏷️</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-foreground">{selectedCoin ? selectedCoin.name : t('all_coins')}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-muted" />
                </button>

                {/* Operation */}
                <div className="text-xs text-foreground-muted mt-2">{t('operation')}:</div>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-card border border-card-border"
                  onClick={() => setOpPicker(true)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-card border border-card-border flex items-center justify-center">
                      <span className="text-foreground/70 text-sm">◦</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-foreground">{OP_LABEL[operationKey]}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-muted" />
                </button>

                {/* Period */}
                <div className="text-xs text-foreground-muted mt-2">{t('period')}:</div>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-card border border-card-border"
                  onClick={() => { setPeriodPicker(true); setCalendarOpen(null); }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-card border border-card-border flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-foreground">{fmtDate(fromDate)} — {fmtDate(toDate)}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-muted" />
                </button>

                <Button
                  className="w-full h-11 mt-4"
                  onClick={() => setFilterOpen(false)}
                >
                  {t('apply')}
                </Button>
                <button className="w-full h-11 mt-2 rounded-xl border border-card-border text-foreground-muted bg-card cursor-not-allowed">{t('create_statement')}</button>
              </div>
            </div>
          ) : coinPicker ? (
            // Coin picker view
            <div className="p-4 pb-6">
              {/* Header row inside picker */}
              <div className="flex items-center justify-between">
                <button onClick={() => setCoinPicker(false)} aria-label="Back" className="p-2 -ml-2 rounded-md hover:bg-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="flex items-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-semibold">{t('filters')}</span>
                </div>
                <div className="w-8" />
              </div>

              <div className="mt-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t('search_coin')}
                    className="pl-9 h-11"
                  />
                </div>
                <div className="text-sm text-foreground-muted">{t('filter_by_crypto')}</div>

                <div className="space-y-2 max-h-[55vh] overflow-y-auto">
                  <button
                    className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80"
                    onClick={() => { setSelectedCoin(null); setCoinPicker(false); }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                        <span className="text-brand text-sm">🏷️</span>
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-foreground font-medium leading-tight">{t('all_coins')}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground-muted" />
                  </button>

                  {filteredCoins.map((c) => (
                    <button
                      key={c.symbol}
                      className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80"
                      onClick={() => { setSelectedCoin(c); setCoinPicker(false); }}
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
            </div>
          ) : opPicker ? (
            // Operation picker view
            <div className="p-4 pb-6">
              {/* Header row inside picker */}
              <div className="flex items-center justify-between">
                <button onClick={() => setOpPicker(false)} aria-label="Back" className="p-2 -ml-2 rounded-md hover:bg-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="flex items-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-semibold">Filters</span>
                </div>
                <div className="w-8" />
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-sm text-foreground-muted mb-1">Choose Operation:</div>

                {([
                  { key: 'all', label: 'All transactions' },
                  { key: 'deposit', label: 'Deposit' },
                  { key: 'withdrawal', label: 'Withdrawal' },
                  { key: 'incoming', label: 'Incoming' },
                  { key: 'outgoing', label: 'Outgoing' },
                  { key: 'exchanged', label: 'Exchanged' },
                  { key: 'rollback', label: 'Rollback' },
                ] as const).map((op) => (
                  <button
                    key={op.key}
                    className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-card-border active:opacity-80"
                    onClick={() => { setOperationKey(op.key as typeof operationKey); setOpPicker(false); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-card border border-card-border flex items-center justify-center">
                        {op.key === 'deposit' && <ArrowDownCircle className="w-5 h-5 text-green-500" />}
                        {op.key === 'withdrawal' && <ArrowUpCircle className="w-5 h-5 text-red-500" />}
                        {op.key === 'incoming' && <ArrowDownRight className="w-5 h-5 text-green-500" />}
                        {op.key === 'outgoing' && <ArrowUpRight className="w-5 h-5 text-red-500" />}
                        {op.key === 'exchanged' && <Shuffle className="w-5 h-5 text-yellow-500" />}
                        {op.key === 'rollback' && <RotateCcw className="w-5 h-5 text-blue-500" />}
                        {op.key === 'all' && <span className="text-foreground/70 text-sm">◦</span>}
                      </div>
                      <div className="text-left">
                        <div className="text-foreground font-medium leading-tight">{op.label}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground-muted" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Period picker view
            <div className="p-4 pb-6">
              {/* Header row inside picker */}
              <div className="flex items-center justify-between">
                <button onClick={() => setPeriodPicker(false)} aria-label="Back" className="p-2 -ml-2 rounded-md hover:bg-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="flex items-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-semibold">{t('filters')}</span>
                </div>
                <div className="w-8" />
              </div>

              <div className="mt-4">
                <div className="text-sm text-foreground-muted mb-3">{t('choose_period')}:</div>

                {/* From */}
                <div className="text-xs text-foreground-muted">{t('from')}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-1 h-11 px-3 rounded-xl bg-card border border-card-border flex items-center text-foreground">
                    {fmtDate(fromDate)}
                  </div>
                  <button
                    className="w-11 h-11 rounded-xl bg-card border border-card-border flex items-center justify-center"
                    onClick={() => {
                      setCalendarOpen('from');
                      setTempDate(fromDate);
                      setCalendarMonth(fromDate.getMonth());
                      setCalendarYear(fromDate.getFullYear());
                    }}
                  >
                    <Calendar className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                <div className="text-xs text-foreground-muted mt-1">{t('enter_start_period')}</div>

                {/* Divider */}
                <div className="border-b border-card-border my-3" />

                {/* To */}
                <div className="text-xs text-foreground-muted">{t('to')}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-1 h-11 px-3 rounded-xl bg-card border border-card-border flex items-center text-foreground">
                    {fmtDate(toDate)}
                  </div>
                  <button
                    className="w-11 h-11 rounded-xl bg-card border border-card-border flex items-center justify-center"
                    onClick={() => {
                      setCalendarOpen('to');
                      setTempDate(toDate);
                      setCalendarMonth(toDate.getMonth());
                      setCalendarYear(toDate.getFullYear());
                    }}
                  >
                    <Calendar className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                <div className="text-xs text-foreground-muted mt-1">{t('enter_end_period')}</div>

                <Button
                  className="w-full h-11 mt-4"
                  onClick={() => { setPeriodPicker(false); setFilterOpen(false); }}
                >
                  {t('apply')}
                </Button>
                <button className="w-full h-11 mt-2 rounded-xl border border-card-border text-foreground-muted bg-card">{t('reset')}</button>
              </div>

              {/* Calendar overlay */}
              {calendarOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                  <div className="w-[92%] max-w-sm rounded-2xl bg-background border border-card-border p-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="text-sm font-medium">
                        {tempDate.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
                      </div>
                      <button onClick={() => setCalendarOpen(null)} aria-label="Close" className="p-1 rounded-md hover:bg-card">✕</button>
                    </div>
                    <div className="mt-2 flex items-center justify-between px-1">
                      <button
                        onClick={() => {
                          const m = calendarMonth - 1;
                          if (m < 0) { setCalendarMonth(11); setCalendarYear(calendarYear - 1); } else { setCalendarMonth(m); }
                        }}
                        className="px-2 py-1 rounded-md hover:bg-card"
                      >
                        ‹
                      </button>
                      <div className="text-sm">{monthLabel(calendarYear, calendarMonth)}</div>
                      <button
                        onClick={() => {
                          const m = calendarMonth + 1;
                          if (m > 11) { setCalendarMonth(0); setCalendarYear(calendarYear + 1); } else { setCalendarMonth(m); }
                        }}
                        className="px-2 py-1 rounded-md hover:bg-card"
                      >
                        ›
                      </button>
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-foreground-muted mt-2 px-1">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (<div key={d}>{d}</div>))}
                    </div>
                    {(() => {
                      const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
                      const max = new Date(calendarYear, calendarMonth + 1, 0).getDate();
                      const cells: JSX.Element[] = [];
                      for (let i = 0; i < firstDay; i++) cells.push(<div key={`e${i}`} />);
                      for (let d = 1; d <= max; d++) {
                        const dateObj = new Date(calendarYear, calendarMonth, d);
                        const isSel = dateObj.toDateString() === tempDate.toDateString();
                        cells.push(
                          <button
                            key={d}
                            onClick={() => setTempDate(dateObj)}
                            className={`h-9 rounded-md text-sm ${isSel ? 'bg-brand text-white' : 'hover:bg-card text-foreground'}`}
                          >
                            {d}
                          </button>
                        );
                      }
                      return <div className="grid grid-cols-7 gap-1 mt-1 px-1">{cells}</div>;
                    })()}

                    <div className="mt-3 px-1">
                      <Button
                        className="w-full h-9"
                        onClick={() => {
                          if (calendarOpen === 'from') setFromDate(tempDate); else if (calendarOpen === 'to') setToDate(tempDate);
                          setCalendarOpen(null);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </MobileContainer>
  );
};
