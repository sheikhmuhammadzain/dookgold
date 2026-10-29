import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Shield, Grid, Fingerprint, Info, KeyRound, ShieldCheck, ChevronRight, Send, CheckSquare, Ban } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TwoFADialog } from '@/components/auth/TwoFADialog';
import { useI18n } from '@/contexts/I18nContext';

export const SecurityScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/profile">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5 text-brand" />
            <h1 className="text-lg font-semibold text-foreground">{t('security')}</h1>
          </div>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        {/* Wallet access */}
        <div className="px-4 pt-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">{t('wallet_access')}</h2>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <Link to="/pin" className="block">
              <div className="flex items-center justify-between p-4 border-b border-gray-200/70">
                <div className="flex items-center space-x-3">
                  <Grid className="w-5 h-5 text-brand" />
                  <span className="text-foreground">{t('pin_code')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
            <Link to="/security/biometrics" className="block">
              <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="w-5 h-5 text-brand" />
                  <span className="text-foreground">{t('biometrics')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>

        {/* Passkeys */}
        <div className="px-4 pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-sm font-semibold text-foreground">{t('passkeys')}</h2>
            <Info className="w-4 h-4 text-foreground-muted" />
          </div>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <Link to="/security/passkeys" className="block">
              <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <KeyRound className="w-5 h-5 text-brand" />
                  <span className="text-foreground">{t('passkeys')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>

        {/* Two-factor authentication */}
        <div className="px-4 pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-sm font-semibold text-foreground">{t('two_factor_authentication')}</h2>
            <Info className="w-4 h-4 text-foreground-muted" />
          </div>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <TwoFADialog
              trigger={
                <div className="flex items-center justify-between p-4 border-b border-gray-200/70 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-brand" />
                    <span className="text-foreground">{t('authenticator')}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground-muted" />
                </div>
              }
              onContinue={() => {
                localStorage.setItem('dook-2fa-intro-shown', 'true');
                navigate('/security/2fa-authenticator');
              }}
            />

            <Link to="/security/2fa-telegram" className="block">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Send className="w-5 h-5 text-brand" />
                  <span className="text-foreground">{t('telegram')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>

        {/* Sessions */}
        <div className="px-4 pt-6 pb-8">
          <h2 className="text-sm font-semibold text-foreground mb-2">{t('sessions')}</h2>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <Link to="/security/sessions" className="block">
              <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col">
                  <span className="text-foreground">{t('view_session_history')}</span>
                  <span className="text-xs text-foreground-muted">{t('sign_out_other_sessions')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>

        {/* IP addresses */}
        <div className="px-4 pt-2 pb-8">
          <h2 className="text-sm font-semibold text-foreground mb-2">{t('ip_addresses')}</h2>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <Link to="/security/ips/allowed" className="block">
              <div className="flex items-center justify-between p-4 border-b border-gray-200/70 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <CheckSquare className="w-5 h-5 text-brand" />
                  <span className="text-foreground">{t('allowed_ips')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
            <Link to="/security/ips/blocked" className="block">
              <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Ban className="w-5 h-5 text-brand" />
                  <span className="text-foreground">{t('blocked_ips')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};
