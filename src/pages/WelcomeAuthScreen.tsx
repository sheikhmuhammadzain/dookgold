import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { DookLogo } from '@/components/ui/DookLogo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

export const WelcomeAuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const goSignIn = () => navigate('/welcome/signin');
  const goCreate = () => navigate('/welcome/signup');

  return (
    <MobileContainer className="bg-neutral-950 text-white min-h-screen flex flex-col" showStatusBar={false}>
      {/* Top content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-14">
        {/* Brand logo */}
        <div className="mb-6">
          <DookLogo size="xxl" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">{t('welcome_to_dook_gold')}</h1>
        <p className="text-sm text-white/70 text-center max-w-xs">
          {t('secure_commission_free_wallet_desc')}
        </p>
      </div>

      {/* Bottom sheet style actions */}
      <div className="mt-auto w-full px-4 pb-8 pt-5 bg-neutral-900/95 rounded-t-2xl border-t border-white/10 shadow-2xl">
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
            onClick={goSignIn}
          >
            {t('sign_in')}
          </Button>
          <Button className="w-full h-11 text-base" onClick={goCreate}>
            <span className="mr-1">+</span> {t('create_account')}
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default WelcomeAuthScreen;
