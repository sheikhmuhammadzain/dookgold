import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Menu, Bell, QrCode, CreditCard, Download, ArrowRightLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionCard } from '@/components/ui/ActionCard';
import { EmptyActions } from '@/components/ui/EmptyActions';
import { useI18n } from '@/contexts/I18nContext';

export const ExchangeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <MobileContainer className="bg-background pb-24">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="grid grid-cols-3 items-center">
          <Link to="/profile" className="justify-self-start">
            <Menu className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-lg font-semibold text-white text-center">{t('exchange')}</h1>
          <div className="flex items-center space-x-3 justify-self-end">
            <Link to="/notifications/history" aria-label="Notifications">
              <Bell className="w-6 h-6 text-white" />
            </Link>
            <Link to="/qr" aria-label="App QR">
              <QrCode className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Empty state with actions */}
      <EmptyActions
        icon={<span className="text-2xl">💼</span>}
        title={t('you_have_no_funds')}
        subtitle={t('to_make_exchange_deposit')}
      >
        <ActionCard
          title={t('buy_with_card')}
          description={t('purchase_crypto_card')}
          icon={<CreditCard className="w-5 h-5 text-brand" />}
          onClick={() => navigate('/currencies')}
        />
        <ActionCard
          title={t('receive')}
          description={t('create_address_top_up')}
          icon={<Download className="w-5 h-5 text-brand" />}
          onClick={() => navigate('/deposit')}
        />
        <ActionCard
          title={t('exchange')}
          description={t('exchange_any_coins')}
          icon={<ArrowRightLeft className="w-5 h-5 text-brand" />}
          onClick={() => navigate('/exchange/new')}
        />
      </EmptyActions>

      <BottomNavigation />
    </MobileContainer>
  );
};
