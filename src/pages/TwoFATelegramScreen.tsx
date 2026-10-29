import React, { useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Link as LinkIcon, Bot, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LinkTelegramSheet } from '@/components/auth/LinkTelegramSheet';
import { toast } from '@/hooks/use-toast';
import { useI18n } from '@/contexts/I18nContext';

export const TwoFATelegramScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const { t } = useI18n();

  const handleVerify = () => {
    if (code.length !== 6) {
      toast({ title: t('invalid_code'), description: t('please_enter_6_digit_from_telegram') });
      return;
    }
    // Simulate successful verification
    localStorage.setItem('dook-2fa-telegram-enabled', 'true');
    toast({ title: t('twofa_via_telegram_enabled'), description: t('your_wallet_is_now_protected') });
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/security">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">{t('twofa_via_telegram')}</h1>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        {/* Step 1 */}
        <div className="p-4">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground"><LinkIcon className="w-4 h-4 text-brand" /> {t('step_1')}</div>
              <div className="mt-1 text-foreground font-medium">{t('link_telegram')}</div>
              <div className="mt-1 text-sm text-foreground-muted">{t('to_use_telegram_link_account')}</div>
            </div>
            <div className="p-4 bg-blue-50">
              <LinkTelegramSheet
                trigger={<Button className="w-full h-11 bg-blue-500 hover:bg-blue-600">{t('link_accounts')}</Button>}
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="px-4">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground"><Bot className="w-4 h-4 text-brand" /> {t('step_2')}</div>
              <div className="mt-1 text-foreground font-medium">{t('go_to_dook_gold_bot')}</div>
              <div className="mt-1 text-sm text-foreground-muted">{t('proceed_to_bot_press_start_copy_code')}</div>
            </div>
            <div className="p-4 bg-blue-50">
              <a href="https://t.me/dookgoldappBot" target="_blank" rel="noreferrer" className="block">
                <Button className="w-full h-11 bg-blue-500 hover:bg-blue-600">{t('dook_gold_bot')}</Button>
              </a>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4">
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground"><KeyRound className="w-4 h-4 text-brand" /> {t('step_3')}</div>
              <div className="mt-1 text-foreground font-medium">{t('verify_with_code')}</div>
              <div className="mt-1 text-sm text-foreground-muted">{t('please_enter_6_digit_from_telegram')}</div>
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
