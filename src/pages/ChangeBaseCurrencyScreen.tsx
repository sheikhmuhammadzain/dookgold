import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';

interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  price: string;
  logoSrc: string;
  isSelected?: boolean;
}

export const ChangeBaseCurrencyScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const { t } = useI18n();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dook-base-crypto');
      if (saved) setSelectedCurrency(saved);
    } catch {}
  }, []);

  const cryptocurrencies: CryptoCurrency[] = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '97979.49 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price: '3944.23 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    },
    {
      id: 'usdt',
      symbol: 'USDT',
      name: 'USDT',
      price: '0.846 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USDC',
      price: '0.843 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
    {
      id: 'shiba-inu',
      symbol: 'SHIB',
      name: 'Shibainu',
      price: '0.0000118 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
    },
    {
      id: 'chainlink',
      symbol: 'LINK',
      name: 'Link',
      price: '20.86 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    },
    {
      id: 'apecoin',
      symbol: 'APE',
      name: 'Ape',
      price: '0.521 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg',
    },
    {
      id: 'decentraland',
      symbol: 'MANA',
      name: 'MANA',
      price: '0.303 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png',
    },
    {
      id: 'sandbox',
      symbol: 'SAND',
      name: 'Sand',
      price: '0.268 EUR',
      logoSrc: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg',
    },
  ];

  const filteredCurrencies = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return cryptocurrencies;
    return cryptocurrencies.filter(currency =>
      currency.name.toLowerCase().includes(q) ||
      currency.symbol.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const currentCurrency = cryptocurrencies.find(c => c.symbol === selectedCurrency);
  const otherCurrencies = filteredCurrencies.filter(c => c.symbol !== selectedCurrency);

  const handleCurrencySelect = (currency: CryptoCurrency) => {
    setSelectedCurrency(currency.symbol);
    try { localStorage.setItem('dook-base-crypto', currency.symbol); } catch {}
    navigate(-1);
  };

  const CurrencyRow: React.FC<{ currency: CryptoCurrency; onClick?: () => void }> = ({ currency, onClick }) => (
    <button
      className="w-full flex items-center justify-between px-3 py-3 text-left active:opacity-80"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <img
          src={currency.logoSrc}
          alt={`${currency.name} logo`}
          className="w-8 h-8 rounded-full object-contain bg-white border border-card-border"
          loading="lazy"
        />
        <div className="text-left">
          <div className="text-sm font-semibold">{currency.name}</div>
          <div className="text-xs text-foreground-muted">{currency.price}</div>
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
          <h1 className="text-lg font-semibold text-white">{t('change_base_cryptocurrency')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('search_coin')} className="pl-9" />
        </div>

        {/* Current crypto */}
        {currentCurrency && (
          <div>
            <div className="text-sm text-foreground-muted mb-2">{t('current_cryptocurrency')}</div>
            <div className="bg-card rounded-xl border border-card-border">
              <CurrencyRow currency={currentCurrency} />
            </div>
          </div>
        )}

        {/* All cryptocurrencies */}
        <div>
          <div className="text-sm text-foreground-muted mb-2">{t('all_cryptocurrencies')}</div>
          <div className="rounded-xl border border-card-border bg-card divide-y">
            {otherCurrencies.map((currency) => (
              <CurrencyRow key={currency.id} currency={currency} onClick={() => handleCurrencySelect(currency)} />
            ))}
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};
