import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Search, Hourglass } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

interface Coin {
  symbol: string;
  name: string;
  logoSrc: string;
}

const COINS: Coin[] = [
  { symbol: 'BTC', name: 'Bitcoin', logoSrc: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { symbol: 'ETH', name: 'Ethereum', logoSrc: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'USDT', name: 'USDT', logoSrc: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'USDC', name: 'USDC', logoSrc: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
  { symbol: 'SHIB', name: 'Shibainu', logoSrc: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
  { symbol: 'LINK', name: 'Link', logoSrc: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
  { symbol: 'APE', name: 'Ape', logoSrc: 'https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg' },
  { symbol: 'MANA', name: 'MANA', logoSrc: 'https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png' },
  { symbol: 'SAND', name: 'Sand', logoSrc: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg' },
];

export const LimitsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const { t } = useI18n();

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COINS;
    return COINS.filter(c => c.name.toLowerCase().includes(s) || c.symbol.toLowerCase().includes(s));
  }, [q]);

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <Hourglass className="w-5 h-5 text-brand" />
            <h1 className="text-lg font-semibold text-foreground">{t('limits')}</h1>
          </div>
        </div>
        <div className="w-6" />
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('choose_currency_set_limit')}
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-100 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* List */}
      <div className="px-4 pb-8">
        <h2 className="text-sm font-semibold text-foreground mb-2">{t('choose_currency_set_limit')}</h2>
        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          {filtered.map((coin, i) => (
            <Link to={`/limits/${coin.symbol}`} key={coin.symbol} className="block">
              <div className={`flex items-center justify-between p-4 ${i < filtered.length - 1 ? 'border-b border-card-border' : ''} hover:bg-background-secondary transition-colors`}>
                <div className="flex items-center gap-3">
                  <img src={coin.logoSrc} alt={`${coin.name} logo`} className="w-8 h-8 rounded-full object-contain" />
                  <span className="text-foreground font-medium">{coin.name}</span>
                </div>
                <span className="text-2xl text-brand">+</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};
