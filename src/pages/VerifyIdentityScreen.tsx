import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Shield, FileText, Camera, CheckCircle2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';

export const VerifyIdentityScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();

  function startVerification() {
    // Placeholder action — in production, integrate your KYC SDK/provider here.
    toast({ title: t('verification'), description: t('kyc_compliance_in_progress') });
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

      <div className="p-3 space-y-4">
        {/* Status */}
        <div className="rounded-xl border border-card-border bg-card p-3 flex items-center gap-3">
          <Shield className="w-5 h-5 text-brand" />
          <div>
            <div className="text-sm font-medium">{t('identity')}</div>
            <div className="text-xs text-foreground-muted">{t('not_required_right_now')}</div>
          </div>
        </div>

        {/* Info box */}
        <div className="rounded-xl border border-card-border bg-card p-3">
          <div className="flex items-center gap-2 font-medium text-foreground"><Info className="w-4 h-4" />{t('kyc_info_title')}</div>
          <p className="text-sm text-foreground-muted mt-1">{t('kyc_info_desc')}</p>
          <p className="text-xs text-foreground-muted mt-2">{t('your_data_protection')}</p>
        </div>

        {/* Steps */}
        <div className="rounded-xl border border-card-border bg-card p-3">
          <div className="text-sm font-medium">{t('how_it_works')}</div>
          <div className="mt-2 space-y-2 text-sm text-foreground">
            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-brand" /> {t('step_fill_form')}</div>
            <div className="flex items-center gap-2"><Camera className="w-4 h-4 text-brand" /> {t('step_upload_docs')}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> {t('step_review_result')}</div>
          </div>
        </div>

        <Button className="w-full h-11" onClick={startVerification}>{t('start_verification')}</Button>
      </div>
    </MobileContainer>
  );
};

export default VerifyIdentityScreen;
