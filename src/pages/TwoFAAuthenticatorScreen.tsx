import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, KeySquare, KeyRound, Copy, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { useI18n } from '@/contexts/I18nContext';

function generateBase32Secret(length = 24) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let out = '';
  const cryptoObj = (window.crypto || (window as any).msCrypto);
  const buf = new Uint8Array(length);
  cryptoObj.getRandomValues(buf);
  for (let i = 0; i < length; i++) {
    out += alphabet[buf[i] % alphabet.length];
  }
  return out;
}

export const TwoFAAuthenticatorScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const { t } = useI18n();
  const secret = useMemo(() => {
    const existing = localStorage.getItem('dook-2fa-auth-secret');
    if (existing) return existing;
    const s = generateBase32Secret();
    localStorage.setItem('dook-2fa-auth-secret', s);
    return s;
  }, []);

  const otpauthUri = useMemo(() => {
    const issuer = encodeURIComponent('Dook Gold');
    const label = encodeURIComponent('Dook Gold:account');
    return `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}`;
  }, [secret]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      toast({ title: t('setup_key_copied') });
    } catch (_) {
      toast({ title: t('copy_failed'), description: t('select_and_copy_key_manually') });
    }
  };

  const handleOpenApp = () => {
    // Attempt to open an authenticator app via otpauth link
    window.location.href = otpauthUri;
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      toast({ title: t('invalid_code'), description: t('enter_6_digit_authenticator') });
      return;
    }
    // Simulate enabling 2FA after verification
    localStorage.setItem('dook-2fa-authenticator-enabled', 'true');
    toast({ title: t('twofa_via_authenticator_enabled'), description: t('your_wallet_is_now_protected') });
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/security">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">{t('twofa_via_authenticator')}</h1>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        {/* Step 1: Save setup key */}
        <div className="p-4">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground"><KeySquare className="w-5 h-5 text-brand" /> {t('step_1')}</div>
              <div className="mt-1 text-foreground font-medium">{t('save_setup_key')}</div>
              <div className="mt-1 text-sm text-foreground-muted">{t('scan_qr_copy_key_in_authenticator')}</div>
            </div>
            <div className="p-4 bg-blue-50 space-y-3">
              <div className="relative">
                <Input readOnly value={secret} className="h-11 pr-12" />
                <button onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-blue-100">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Button onClick={handleOpenApp} className="flex-1 h-11">{t('open_app')}</Button>
                <a href={otpauthUri} className="p-2 rounded-md border bg-white hover:bg-gray-50" title={t('open_qr_in_authenticator')}>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Verify */}
        <div className="px-4">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground"><KeyRound className="w-5 h-5 text-brand" /> {t('step_2')}</div>
              <div className="mt-1 text-foreground font-medium">{t('verify_with_code')}</div>
              <div className="mt-1 text-sm text-foreground-muted">{t('paste_6_digit_verification_code_authenticator')}</div>
            </div>
            <div className="p-4 bg-blue-50">
              <div className="flex justify-center mb-4">
                <InputOTP maxLength={6} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <InputOTPSlot key={idx} index={idx} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="space-y-3">
                <Button className="w-full h-11" onClick={handleVerify}>{t('verify')}</Button>
                <Link to="/security/2fa-enter-code" className="block">
                  <Button variant="outline" className="w-full h-11">{t('enter_code')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </MobileContainer>
  );
};
