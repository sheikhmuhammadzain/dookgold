import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n, Lang } from '@/contexts/I18nContext';

const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
];

export const LanguageScreen: React.FC = () => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();

  const choose = (code: Lang) => {
    setLang(code);
    navigate(-1);
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('language')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-2xl border border-card-border bg-card overflow-hidden">
          {LANGS.map((l, i) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className={`w-full flex items-center justify-between p-4 text-left hover:bg-background-secondary transition-colors ${i < LANGS.length - 1 ? 'border-b border-card-border' : ''}`}
            >
              <div>
                <div className="text-foreground font-medium">{l.label}</div>
                <div className="text-sm text-foreground-muted">{l.native}</div>
              </div>
              {lang === l.code && <Check className="w-5 h-5 text-brand" />}
            </button>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};

export default LanguageScreen;
