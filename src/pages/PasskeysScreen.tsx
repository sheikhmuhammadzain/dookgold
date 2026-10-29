import React, { useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Info, LockKeyhole, ThumbsUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/contexts/I18nContext';

export const PasskeysScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { t } = useI18n();

  async function handleCreatePasskey() {
    // Try to open a native WebAuthn prompt if available, otherwise just simulate success
    try {
      const supported = !!(window.PublicKeyCredential && typeof window.PublicKeyCredential === 'function');
      if (supported) {
        // Minimal demo options (NOT production ready)
        const publicKey: PublicKeyCredentialCreationOptions = {
          challenge: Uint8Array.from('dook-demo-challenge', c => c.charCodeAt(0)),
          rp: { name: 'DOOK GOLD' },
          user: {
            id: Uint8Array.from('dook-user-id', c => c.charCodeAt(0)),
            name: 'user@example.com',
            displayName: 'Dook User',
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          authenticatorSelection: { userVerification: 'preferred' },
          timeout: 60000,
        };
        await navigator.credentials.create({ publicKey });
      }
    } catch (e) {
      // Ignore errors; treat as cancelled or unsupported
    }

    toast({ title: t('passkey_created'), description: t('passkey_setup_success') });
    setConfirmOpen(false);
    navigate(-1);
  }

  return (
    <MobileContainer className="bg-background pb-8">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('passkeys')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-8 text-center">
        <div className="w-24 h-24 rounded-2xl bg-brand/10 text-brand mx-auto flex items-center justify-center mb-6">
          <LockKeyhole className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('protect_wallet_with_passkey')}</h2>
        <p className="text-sm text-foreground-muted mb-6">{t('use_passkeys_for_instant_sign_in')}</p>

        <div className="max-w-sm mx-auto text-left space-y-3">
          <div className="flex items-start gap-3">
            <ThumbsUp className="w-5 h-5 text-brand mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">{t('no_passwords_or_codes')}</div>
              <div className="text-xs text-foreground-muted">{t('sign_in_with_device_lock')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-brand mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">{t('instant_confirmations')}</div>
              <div className="text-xs text-foreground-muted">{t('quickly_confirm_signins_and_transactions')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">{t('extra_secure_and_easy')}</div>
              <div className="text-xs text-foreground-muted">{t('passkeys_resistant_to_phishing')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-brand mt-0.5" />
            <div>
              <div className="text-sm text-foreground">{t('learn_more_about_passkey')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="px-5 mt-8">
        <Button className="w-full h-12 text-base" onClick={() => setConfirmOpen(true)}>{t('create_passkey')}</Button>
      </div>

      {/* Confirm sheet (simulating native sheet) */}
      <Sheet open={confirmOpen} onOpenChange={setConfirmOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0">
          <div className="p-5 pb-3">
            <SheetHeader className="text-left">
              <SheetTitle>{t('create_passkey_and_save_question')}</SheetTitle>
              <p className="text-sm text-foreground-muted">{t('passkey_can_be_used_on_other_devices')}</p>
            </SheetHeader>
          </div>
          <div className="px-5 pb-5 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-card-border bg-card">
              <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                <LockKeyhole className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{t('dook_user')}</div>
                <div className="text-xs text-foreground-muted">{t('passkey_label')}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11" onClick={() => setConfirmOpen(false)}>{t('cancel')}</Button>
              <Button className="h-11" onClick={handleCreatePasskey}>{t('create')}</Button>
            </div>
            <button className="text-xs text-brand underline" onClick={() => { /* could show alt flows */ }}>{t('save_another_way')}</button>
          </div>
        </SheetContent>
      </Sheet>
    </MobileContainer>
  );
};

export default PasskeysScreen;
