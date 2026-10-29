import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';

interface Coin {
  symbol: string;
  name: string;
  logoSrc?: string;
}

const COINS: Coin[] = [
  { symbol: 'BNB', name: 'BNB', logoSrc: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { symbol: 'SOL', name: 'Solana', logoSrc: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'ROX', name: 'ROX', logoSrc: 'https://assets.coingecko.com/coins/images/14678/small/roxe.jpg' },
  { symbol: 'PEPE', name: 'Pepe', logoSrc: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
  { symbol: 'DAI', name: 'Dai', logoSrc: 'https://assets.coingecko.com/coins/images/9956/small/4943.png' },
  { symbol: 'UNI', name: 'Uniswap', logoSrc: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png' },
  { symbol: 'TRX', name: 'Tronix', logoSrc: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png' },
  { symbol: 'LTC', name: 'Litecoin', logoSrc: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
  { symbol: 'BCH', name: 'Bitcoin Cash', logoSrc: 'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png' },
  { symbol: 'SAND', name: 'Sand', logoSrc: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg' },
  { symbol: 'AXS', name: 'AXS', logoSrc: 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png' },
  { symbol: 'AAVE', name: 'AAVE', logoSrc: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png' },
  { symbol: 'LDO', name: 'Lido DAO', logoSrc: 'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png' },
  { symbol: 'CHZ', name: 'Chiliz', logoSrc: 'https://assets.coingecko.com/coins/images/8834/small/Chiliz.png' },
  { symbol: 'CTC', name: 'Creditcoin', logoSrc: 'https://assets.coingecko.com/coins/images/8461/small/CTC.png' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', logoSrc: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png' },
  { symbol: 'WETH', name: 'Wrapped Ether', logoSrc: 'https://assets.coingecko.com/coins/images/2518/small/weth.png' },
];

export const AddCoinScreen: React.FC = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const { t } = useI18n();

  const filtered = useMemo(() => {
    if (!q.trim()) return COINS;
    const s = q.toLowerCase();
    return COINS.filter((c) => c.name.toLowerCase().includes(s) || c.symbol.toLowerCase().includes(s));
  }, [q]);

  function openCoin(coin: Coin) {
    navigate(`/market/${coin.symbol}`, {
      state: {
        crypto: {
          symbol: coin.symbol,
          name: coin.name,
          balance: `0.00000000 ${coin.symbol}`,
          balanceUsd: '0.00 USD',
          price: '—',
          change: '+0.00',
          changePercent: '+0.00%',
          logoSrc: coin.logoSrc,
          icon: coin.symbol[0],
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
          <h1 className="text-lg font-semibold text-white">{t('add_a_coin')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('search_coin')}
            className="pl-9"
          />
        </div>

        {/* List */}
        <div className="rounded-xl border border-card-border bg-card divide-y">
          <div className="px-3 py-2 text-sm text-foreground-muted">{t('available_coins')}</div>
          {filtered.map((coin) => (
            <button
              key={coin.symbol}
              className="w-full flex items-center justify-between px-3 py-3 active:opacity-80"
              onClick={() => openCoin(coin)}
            >
              <div className="flex items-center gap-3">
                {coin.logoSrc ? (
                  <img src={coin.logoSrc} alt={`${coin.name} logo`} className="w-8 h-8 rounded-full bg-white" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center text-sm">
                    {coin.symbol[0]}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-sm font-medium">{coin.name}</div>
                  <div className="text-xs text-foreground-muted">{coin.symbol}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-foreground-muted" />
            </button>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};

export default AddCoinScreen;
