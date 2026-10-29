import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, MapPin, MonitorSmartphone, Clock, LogOut, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';

interface SessionItem {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location?: string;
  lastActive: string; // ISO
  current?: boolean;
}

const STORAGE_KEY = 'dook-sessions';

function seedSessions(): SessionItem[] {
  const now = new Date();
  return [
    {
      id: crypto.randomUUID(),
      device: 'This device',
      browser: 'Chrome',
      os: 'Windows',
      ip: '192.168.1.20',
      location: 'Local Network',
      lastActive: now.toISOString(),
      current: true,
    },
    {
      id: crypto.randomUUID(),
      device: 'iPhone 14',
      browser: 'Safari',
      os: 'iOS',
      ip: '102.22.41.77',
      location: 'Karachi, PK',
      lastActive: new Date(now.getTime() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      device: 'MacBook Pro',
      browser: 'Chrome',
      os: 'macOS',
      ip: '34.56.78.90',
      location: 'San Francisco, US',
      lastActive: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ];
}

export const SessionsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const { t } = useI18n();

  // load or seed
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setSessions(JSON.parse(raw)); return; } catch {}
    }
    const seeded = seedSessions();
    setSessions(seeded);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  }, []);

  const otherSessions = useMemo(() => sessions.filter(s => !s.current), [sessions]);

  const save = (list: SessionItem[]) => {
    setSessions(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const signOutOne = (id: string) => {
    save(sessions.filter(s => s.id !== id));
  };
  const signOutOthers = () => {
    save(sessions.filter(s => s.current));
  };

  const formatLastActive = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">{t('session_history')}</h1>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 bg-white">
        <div className="p-4 space-y-3">
          {sessions.map((s) => (
            <div key={s.id} className="p-4 rounded-xl border border-gray-200 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <MonitorSmartphone className="w-4 h-4 text-brand" />
                    {s.device} {s.current && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{t('current')}</span>}
                  </div>
                  <div className="text-sm text-foreground-muted">{s.browser} · {s.os}</div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <MapPin className="w-4 h-4" />
                    <span>{s.location || t('unknown')}, {s.ip}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Clock className="w-4 h-4" />
                    <span>{t('last_active')} · {formatLastActive(s.lastActive)}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <Button variant="outline" size="sm" className="h-9" onClick={() => signOutOne(s.id)} disabled={!!s.current}>
                    <LogOut className="w-4 h-4 mr-2" /> {t('sign_out')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md w-full p-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <Button className="w-full h-12 text-base" variant={otherSessions.length ? 'default' : 'secondary'} onClick={signOutOthers} disabled={!otherSessions.length}>
          {t('sign_out_other_sessions')}
        </Button>
      </div>
    </MobileContainer>
  );
};
