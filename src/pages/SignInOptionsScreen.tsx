import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { DookLogo } from '@/components/ui/DookLogo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Apple, Chrome } from 'lucide-react';
import { startGoogleOAuth } from '@/api/auth';
import { useI18n } from '@/contexts/I18nContext';

export const SignInOptionsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <MobileContainer className="bg-neutral-950 text-white min-h-screen flex flex-col" showStatusBar={false}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 text-white/80">
        <button onClick={() => navigate('/welcome')} className="text-base hover:text-white transition-colors">
          ← {t('back')}
        </button>
        <span className="text-sm">{t('sign_in')}</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-6">
        <div className="mb-6">
          <DookLogo size="xxl" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">{t('welcome_back')}</h1>
        <p className="text-sm text-white/70 text-center max-w-xs">{t('choose_method_to_sign_in')}</p>
      </div>

      {/* Actions */}
      <div className="mt-auto px-4 pb-8 pt-5 bg-neutral-900/95 rounded-t-2xl border-t border-white/10 shadow-2xl">
        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full h-11 bg-neutral-800 border-neutral-700 text-white"
            onClick={() => startGoogleOAuth()}
          >
            <Chrome className="w-4 h-4 mr-2" /> {t('sign_in_with_google')}
          </Button>
          <Button
            variant="secondary"
            className="w-full h-11 bg-neutral-800 border-neutral-700 text-white"
            onClick={() => navigate('/pin')}
          >
            <Apple className="w-4 h-4 mr-2" /> {t('sign_in_with_apple')}
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default SignInOptionsScreen;
