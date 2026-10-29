import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';

interface IPItem {
  name: string;
  ip: string;
}

const STORAGE_KEY = 'dook-blocked-ips';

export const BlockedIPsScreen: React.FC = () => {
  const [items, setItems] = useState<IPItem[]>([]);
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    }
  }, []);

  const isEmpty = items.length === 0;

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">{t('blocked_ips')}</h1>
        </div>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 bg-white">
        {isEmpty ? (
          <div className="px-6 py-10 text-center">
            <h2 className="text-lg font-semibold mb-2 text-foreground">{t('you_have_no_blocked_ips')}</h2>
            <p className="text-sm text-foreground-muted max-w-xl mx-auto">{t('blocked_ips_info')}</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">{item.name}</div>
                  <div className="text-sm text-foreground-muted">{item.ip}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-foreground-muted text-sm">
              <Info className="w-4 h-4" /> {t('manage_blocklist')}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add */}
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md w-full p-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <Link to="/security/ips/blocked/add" className="block">
          <Button className="w-full h-12 text-base">{t('add')}</Button>
        </Link>
      </div>
    </MobileContainer>
  );
};
