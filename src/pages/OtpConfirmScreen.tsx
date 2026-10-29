import React, { useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';

interface NextState {
  nextPath: string;
  nextState?: any;
  context?: 'send' | 'deposit' | 'other';
}

export const OtpConfirmScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useI18n();
  const { toast } = useToast();

  const { nextPath, nextState, context } = (state || {}) as NextState;
  const [code, setCode] = useState('');

  function handleVerify() {
    const valid = code.trim().length === 6 || code.trim() === '123456';
    if (!valid) {
      toast({ title: t('invalid_code'), description: t('please_enter_valid_code') });
      return;
    }
    if (!nextPath) {
      navigate(-1);
      return;
    }
    navigate(nextPath, { state: nextState, replace: true });
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="grid grid-cols-3 items-center">
          <button onClick={() => navigate(-1)} aria-label="Back" className="justify-self-start p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white text-center">{t('verification')}</h1>
          <div className="w-6 h-6 justify-self-end" />
        </div>
      </div>

      <div className="p-3 space-y-5">
        <div className="rounded-xl border border-card-border bg-card p-4 text-center space-y-2">
          <div className="flex justify-center">
            <ShieldCheck className="w-8 h-8 text-brand" />
          </div>
          <div className="text-sm text-foreground">
            {context === 'send' ? t('two_factor_authentication') : t('verification')} — {t('enter_code')}
          </div>
          <div className="text-xs text-foreground-muted">
            {t('enter_6_digit_authenticator')}
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card p-4 space-y-3">
          <label className="text-sm text-foreground-muted">{t('verification_code')}</label>
          <Input inputMode="numeric" maxLength={6 as any} placeholder="••••••" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} />
          <Button className="w-full h-11" onClick={handleVerify}>{t('verify')}</Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default OtpConfirmScreen;
