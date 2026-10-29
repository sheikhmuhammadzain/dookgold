import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, ChevronRight, User, CreditCard, Send, Mail, Shield, Bitcoin, DollarSign, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LinkTelegramSheet } from '@/components/auth/LinkTelegramSheet';
import { DeleteAccountSheet } from '@/components/auth/DeleteAccountSheet';
import { useI18n } from '@/contexts/I18nContext';

export const ProfileDetailsScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('Nayabkhan khan');
  const [fiat, setFiat] = useState<string>('USD');
  const [baseCrypto, setBaseCrypto] = useState<{ symbol: string; name: string }>({ symbol: 'BTC', name: 'Bitcoin' });
  const { t } = useI18n();

  useEffect(() => {
    const saved = localStorage.getItem('dook-username');
    if (saved) setUsername(saved);
    try {
      const f = localStorage.getItem('dook-fiat');
      if (f) setFiat(f);
      const c = localStorage.getItem('dook-base-crypto');
      const names: Record<string, string> = {
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
        USDT: 'USDT',
        USDC: 'USDC',
        SHIB: 'Shibainu',
        LINK: 'Link',
        APE: 'Ape',
        MANA: 'MANA',
        SAND: 'Sand',
      };
      if (c && names[c]) setBaseCrypto({ symbol: c, name: names[c] });
    } catch {}
  }, []);
  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/profile">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center space-x-2">
            <User className="w-5 h-5 text-brand" />
            <h1 className="text-lg font-semibold text-foreground">{t('profile')}</h1>
          </div>
        </div>
        <div className="w-6"></div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white">
        {/* Details Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('details')}</h2>
          
          <div className="space-y-4">
            <Link to="/profile/change-username" className="block">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-brand" />
                  <div>
                    <p className="text-sm text-foreground-muted">{t('username')}</p>
                    <p className="font-medium text-foreground">{username}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-brand" />
                <div>
                  <p className="text-sm text-foreground-muted">{t('user_id')}</p>
                  <p className="font-medium text-foreground">D746242TGABN5LI4SANQ</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-muted" />
            </div>

            <LinkTelegramSheet
              trigger={
                <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Send className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-foreground-muted">{t('telegram')}</p>
                      <p className="font-medium text-foreground">{t('link')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground-muted" />
                </div>
              }
            />

            <Link to="/profile/change-email" className="block">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand" />
                  <div>
                    <p className="text-sm text-foreground-muted">{t('email')}</p>
                    <p className="font-medium text-foreground">nayabkhankhan918@gmail.com</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>

        {/* Verification Section */}
        <div className="p-4 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('verification')}</h2>
          
          <Link to="/profile/verify-identity" className="block">
            <div className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-brand" />
                <div>
                  <p className="text-sm text-foreground-muted">{t('identity')}</p>
                  <p className="font-medium text-foreground-muted">{t('not_required')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-muted" />
            </div>
          </Link>
        </div>

        {/* Base Currency Section */}
        <div className="p-4 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('base_currency')}</h2>
          
          <div className="space-y-4">
            <Link to="/profile/change-currency" className="block">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                    <Bitcoin className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-muted">{t('crypto_label')}</p>
                    <p className="font-medium text-foreground">{baseCrypto.name} ({baseCrypto.symbol})</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>

            <Link to="/profile/change-fiat" className="block">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-muted">{t('fiat_label')}</p>
                    <p className="font-medium text-foreground">{fiat}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>

        {/* Account Section */}
        <div className="p-4 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('account')}</h2>
          
          <DeleteAccountSheet
            trigger={
              <div className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors cursor-pointer rounded-md">
                <div className="flex items-center space-x-3">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-500">{t('delete_label')}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            }
          />
        </div>
      </div>
    </MobileContainer>
  );
};