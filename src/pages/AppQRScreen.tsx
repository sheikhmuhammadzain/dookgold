import React, { useMemo } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Share2, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';

export const AppQRScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();

  const appUrl = useMemo(() => {
    try {
      return window.location.origin;
    } catch {
      return 'https://dookgold.app';
    }
  }, []);

  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(appUrl)}`,
    [appUrl]
  );

  async function copy(text: string) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      toast({ title: t('address_copied'), description: t('app_link_copied') });
    } catch (_) {
      toast({ title: t('copy_failed'), description: t('select_and_copy_key_manually') });
    }
  }

  async function share(text: string) {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'DOOK GOLD', text });
      } else {
        await copy(text);
      }
    } catch {}
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('app_qr')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-4">
        <div className="rounded-xl border border-card-border bg-card p-4 flex flex-col items-center gap-3">
          <img src={qrUrl} alt={t('app_qr')} className="w-56 h-56" />
          <div className="text-xs text-foreground-muted">{t('scan_to_open_app')}</div>
        </div>

        <div className="rounded-xl border border-card-border bg-card p-3 space-y-2">
          <div className="text-sm font-medium">URL</div>
          <div className="flex items-center gap-2">
            <Input readOnly className="font-mono" value={appUrl} />
            <Button variant="secondary" size="icon" aria-label="Share" onClick={() => share(appUrl)}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon" aria-label="Copy" onClick={() => copy(appUrl)}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default AppQRScreen;
