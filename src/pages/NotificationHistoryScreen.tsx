import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Bell, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  at: string; // ISO
  ip?: string;
}

const STORAGE_KEY = 'notif-history';

function seedHistory(): HistoryItem[] {
  const now = new Date();
  const mk = (daysAgo: number, hourDelta: number, title: string, ip: string): HistoryItem => ({
    id: crypto.randomUUID(),
    title,
    description: `Access to the wallet from ${ip}`,
    at: new Date(now.getTime() - (daysAgo * 86400000 + hourDelta * 3600000)).toISOString(),
    ip,
  });
  return [
    mk(0, 0, 'Successful login', '103.26.238.90'),
    mk(3, 2, 'Successful login', '103.26.238.90'),
    mk(7, 5, 'Successful login', '103.26.238.90'),
    mk(14, 1, 'Successful login', '103.26.238.90'),
    mk(30, 3, 'Successful login', '103.26.238.90'),
  ];
}

export const NotificationHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const { t } = useI18n();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); return; } catch {}
    }
    const seeded = seedHistory();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    setItems(seeded);
  }, []);

  const fmt = (iso: string) => {
    const d = new Date(iso);
    const date = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <Bell className="w-5 h-5 text-brand" />
            <h1 className="text-lg font-semibold text-foreground">{t('notifications')}</h1>
          </div>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 border-gray-100">
            <div>
              <div className="text-sm text-foreground-muted">{fmt(it.at)}</div>
              <div className="text-foreground font-medium">{t('successful_sign_in')}</div>
              <div className="text-sm text-foreground-muted">{it.ip ? `${t('access_to_wallet_from')} ${it.ip}` : it.description}</div>
            </div>
            <Lock className="w-5 h-5 text-red-500" />
          </div>
        ))}
      </div>
    </MobileContainer>
  );
};
