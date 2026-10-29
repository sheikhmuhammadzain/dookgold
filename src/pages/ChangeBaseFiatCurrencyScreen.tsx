import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';

interface FiatCurrency {
  code: string; // e.g. USD
  name: string; // e.g. US Dollar
  symbol: string; // e.g. $
}

const ALL_FIATS: FiatCurrency[] = [
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

export const ChangeBaseFiatCurrencyScreen: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedFiat, setSelectedFiat] = useState<string>('EUR');
  const { t } = useI18n();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dook-fiat');
      if (saved) setSelectedFiat(saved);
    } catch {}
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_FIATS;
    return ALL_FIATS.filter(
      (f) => f.code.toLowerCase().includes(q) || f.name.toLowerCase().includes(q)
    );
  }, [query]);

  const current = ALL_FIATS.find((f) => f.code === selectedFiat) || ALL_FIATS[0];
  const others = filtered.filter((f) => f.code !== current.code);

  const handleSelect = (code: string) => {
    setSelectedFiat(code);
    try { localStorage.setItem('dook-fiat', code); } catch {}
    // Return to previous screen (Profile Details) after selection
    navigate(-1);
  };

  const FiatRow: React.FC<{ fiat: FiatCurrency; onClick?: () => void }> = ({ fiat, onClick }) => (
    <button
      className="w-full flex items-center justify-between px-3 py-3 bg-neutral-800 rounded-xl border border-white/10 text-white active:opacity-80"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white text-base font-semibold">
          {fiat.symbol}
        </div>
        <div className="text-left">
          <div className="text-base font-medium">{fiat.code}</div>
          <div className="text-xs text-white/60">{fiat.name}</div>
        </div>
      </div>
    </button>
  );

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('change_base_fiat_currency')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_a_fiat_currency')}
            className="pl-9"
          />
        </div>

        {/* Current fiat */}
        <div>
          <div className="text-sm text-foreground-muted mb-2">{t('current_fiat_currency')}</div>
          <div className="bg-card rounded-xl border border-card-border">
            <div className="flex items-center justify-between px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-semibold">
                  {current.symbol}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">{current.code}</div>
                  <div className="text-xs text-foreground-muted">{current.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All fiats */}
        <div>
          <div className="text-sm text-foreground-muted mb-2">{t('all_fiat_currencies')}</div>
          <div className="rounded-xl border border-card-border bg-card divide-y">
            {others.map((f) => (
              <button
                key={f.code}
                className="w-full flex items-center justify-between px-3 py-3 text-left active:opacity-80"
                onClick={() => handleSelect(f.code)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-semibold">
                    {f.symbol}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{f.code}</div>
                    <div className="text-xs text-foreground-muted">{f.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default ChangeBaseFiatCurrencyScreen;
