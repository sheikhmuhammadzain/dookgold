import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { BalanceCard } from '@/components/wallet/BalanceCard';
import { CryptoCard } from '@/components/crypto/CryptoCard';
import { ActionButtons } from '@/components/ui/ActionButtons';
import { Menu, Bell, QrCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

export const BalanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const cryptoData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: '0.00000000 BTC',
      balanceUsd: '0.00 USD',
      price: '109952.89 USD',
      change: '-3329.15',
      changePercent: '-2.91%',
      icon: '₿',
      trend: 'down' as const
    },
    {
      symbol: 'ETH', 
      name: 'Ethereum',
      balance: '0.00000000 ETH',
      balanceUsd: '0.00 USD',
      price: '4260.56 USD',
      change: '+677.38',
      changePercent: '+18.74%',
      icon: 'Ξ',
      trend: 'up' as const
    }
  ];

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/profile">
            <Menu className="w-6 h-6 text-white" />
          </Link>
          <Link to="/wallets">
            <h1 className="text-lg font-semibold text-white">{t('wallets')}</h1>
          </Link>
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

      {/* Balance Card */}
      <div className="">
        <BalanceCard
          totalBalance="0.00"
          change="-0.00"
          changePercent="0.00%"
        />
      </div>

      {/* All coins section */}
      <div className="px-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-foreground">{t('all_coins')}</h2>
            <span className="text-sm text-foreground-muted bg-gray-100 px-2 py-1 rounded-full">
              7
            </span>
          </div>
          <ActionButtons />
        </div>

        {/* Crypto list */}
        <div className="space-y-2">
          {cryptoData.map((crypto, index) => (
            <CryptoCard
              key={index}
              {...crypto}
              onIconClick={() => navigate(`/market/${crypto.symbol}`, { state: { crypto } })}
            />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </MobileContainer>
  );
};