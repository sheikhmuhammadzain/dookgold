import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';

export const ChangeEmailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    try {
      const e = localStorage.getItem('dook-email');
      if (e) setEmail(e);
    } catch {}
  }, []);

  function sendCode() {
    // In a real app, send verification code to the email
    setCodeSent(true);
    toast({ title: t('verification'), description: t('verification_code_sent') });
  }

  function verifyAndSave() {
    // Mock verify always success if code length >= 4
    if (code.trim().length < 4) {
      toast({ title: t('invalid_code'), description: t('please_enter_valid_code') });
      return;
    }
    try { localStorage.setItem('dook-email', email); } catch {}
    toast({ title: t('email_updated'), description: t('security_notice_email') });
    navigate(-1);
  }

  return (
    <MobileContainer className="bg-background pb-20">
      <div className="bg-brand px-2 py-2">
        <div className="grid grid-cols-3 items-center">
          <button onClick={() => navigate(-1)} aria-label="Back" className="justify-self-start p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white text-center">{t('change_email')}</h1>
          <div className="w-6 h-6 justify-self-end" />
        </div>
      </div>

      <div className="p-3 space-y-4">
        <div className="rounded-xl border border-card-border bg-card p-3 space-y-2">
          <label className="text-sm text-foreground-muted">{t('email')}</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          <p className="text-xs text-foreground-muted">{t('security_email_notice')}</p>
          {!codeSent ? (
            <Button className="h-11" onClick={sendCode}>{t('send_verification_code')}</Button>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">{t('verification_code')}</label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="1234" inputMode="numeric" />
              <Button className="h-11 w-full" onClick={verifyAndSave}>{t('verify_email')}</Button>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
};

export default ChangeEmailScreen;
