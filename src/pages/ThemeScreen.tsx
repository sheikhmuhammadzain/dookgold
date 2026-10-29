import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

const THEME_KEY = 'dook-theme';

export const ThemeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const { t } = useI18n();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) setIsDark(saved === 'dark');
      else setIsDark(document.documentElement.classList.contains('dark'));
    } catch {}
  }, []);

  const applyTheme = (dark: boolean) => {
    setIsDark(dark);
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch {}
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <MobileContainer className="bg-background pb-10">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('theme')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        <div className="text-center">
          <p className="text-foreground-muted text-sm">{t('toggle_light_dark')}</p>
        </div>

        {/* Polished aesthetic toggle */}
        <div className="flex items-center justify-center">
          <button
            aria-label="Toggle theme"
            onClick={() => applyTheme(!isDark)}
            className={`relative w-64 h-14 rounded-full transition-colors duration-300 shadow-md border ${
              isDark
                ? 'bg-gradient-to-r from-neutral-800 to-neutral-900 border-white/10'
                : 'bg-gradient-to-r from-white to-neutral-100 border-black/10'
            }`}
          >
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-5 z-10 pointer-events-none">
              <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-700'}`}>
                <Sun className={`w-5 h-5 ${isDark ? 'opacity-60' : ''}`} /> Light
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-500'}`}>
                <Moon className={`w-5 h-5 ${isDark ? '' : 'opacity-60'}`} /> Dark
              </div>
            </div>
            {/* Knob */}
            <div
              className={`absolute top-1 h-12 rounded-full transition-all duration-300 shadow-lg z-0 ${
                isDark ? 'bg-neutral-800' : 'bg-white'
              }`}
              style={{ width: '7.5rem', left: isDark ? 'calc(100% - 0.5rem - 7.5rem)' : '0.25rem' }}
            />
          </button>
        </div>

        {/* Theme preview card */}
        <div className="rounded-2xl border border-card-border bg-card p-4">
          <div className="text-sm font-semibold text-foreground mb-3">{t('preview')}</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10" />
            <div className="h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10" />
            <div className="h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10" />
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default ThemeScreen;
