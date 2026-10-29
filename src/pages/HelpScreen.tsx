import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, HelpCircle, Mail, Globe, BookOpen, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useI18n } from '@/contexts/I18nContext';

export const HelpScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('help')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* About */}
        <div className="rounded-2xl border border-card-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-brand" />
            <h2 className="text-base font-semibold text-foreground">{t('about_dook')}</h2>
          </div>
          <p className="text-sm text-foreground-secondary">
            DOOK GOLD is a modern crypto wallet that makes buying, storing, and sending digital assets simple and secure.
            Manage popular cryptocurrencies, view real‑time prices, and keep your account safe with features like Passkeys and 2FA.
          </p>
        </div>

        {/* Quick help / links */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="mailto:support@dookgold.app"
            className="rounded-xl border border-card-border bg-card p-4 flex items-center gap-3 hover:bg-background-secondary transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{t('contact')}</div>
              <div className="text-xs text-foreground-muted">support@dookgold.app</div>
            </div>
          </a>
          <a
            href="#"
            className="rounded-xl border border-card-border bg-card p-4 flex items-center gap-3 hover:bg-background-secondary transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{t('website')}</div>
              <div className="text-xs text-foreground-muted">dookgold.app</div>
            </div>
          </a>
        </div>

        {/* FAQs */}
        <div className="rounded-2xl border border-card-border bg-card p-2">
          <div className="flex items-center gap-2 px-2 pt-2">
            <BookOpen className="w-5 h-5 text-brand" />
            <h3 className="text-sm font-semibold text-foreground">{t('faqs')}</h3>
          </div>
          <Accordion type="single" collapsible className="p-2">
            <AccordionItem value="what-is-dook">
              <AccordionTrigger className="text-left">{t('what_is_dook')}</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground-secondary">
                {t('what_is_dook')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-to-deposit">
              <AccordionTrigger className="text-left">{t('how_deposit')}</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground-secondary">
                {t('how_deposit')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="is-it-secure">
              <AccordionTrigger className="text-left">{t('is_it_secure')}</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground-secondary">
                {t('is_it_secure')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Trust & safety blurb */}
        <div className="rounded-2xl border border-card-border bg-card p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{t('trust_safety')}</div>
            <p className="text-sm text-foreground-secondary">{t('trust_safety')}</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default HelpScreen;
