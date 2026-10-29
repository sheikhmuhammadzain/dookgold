import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useI18n } from '@/contexts/I18nContext';

export const BiometricsScreen: React.FC = () => {
  const [useForPin, setUseForPin] = useState<boolean>(false);
  const [useFor2fa, setUseFor2fa] = useState<boolean>(false);
  const { t } = useI18n();

  useEffect(() => {
    const pin = localStorage.getItem('dook-biometrics-pin');
    const twofa = localStorage.getItem('dook-biometrics-2fa');
    if (pin !== null) setUseForPin(pin === 'true');
    if (twofa !== null) setUseFor2fa(twofa === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('dook-biometrics-pin', String(useForPin));
  }, [useForPin]);

  useEffect(() => {
    localStorage.setItem('dook-biometrics-2fa', String(useFor2fa));
  }, [useFor2fa]);

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Link to="/security">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">{t('biometrics')}</h1>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        {/* With face or fingerprint card */}
        <div className="px-4 pt-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <h2 className="text-base font-semibold text-foreground">{t('with_face_or_fingerprint')}</h2>
            <p className="text-sm text-foreground-muted mt-1">{t('you_can_use_biometrics')}</p>
          </div>
        </div>

        {/* Use biometrics instead of */}
        <div className="px-4 pt-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
            <div className="px-4 pt-4 pb-2 text-sm font-semibold text-foreground">{t('use_biometrics_instead_of')}</div>
            {/* PIN row */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200/70">
              <div className="flex items-center gap-2">
                <span className="text-foreground">{t('pin_short')}</span>
                <Info className="w-4 h-4 text-foreground-muted" />
              </div>
              <Switch checked={useForPin} onCheckedChange={setUseForPin} />
            </div>
            {/* 2FA row */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200/70">
              <div className="flex items-center gap-2">
                <span className="text-foreground">{t('twofa_short')}</span>
                <Info className="w-4 h-4 text-foreground-muted" />
              </div>
              <Switch checked={useFor2fa} onCheckedChange={setUseFor2fa} />
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </MobileContainer>
  );
};
