import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useI18n } from '@/contexts/I18nContext';

interface IPItem { name: string; ip: string; }
const STORAGE_KEY = 'dook-blocked-ips';

const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

export const AddBlockedIPScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => setError(null), [name, ip]);

  const handleAdd = () => {
    if (!name.trim()) return setError(t('please_enter_ip_name'));
    if (!ipv4Regex.test(ip.trim())) return setError(t('please_enter_valid_ipv4'));

    const raw = localStorage.getItem(STORAGE_KEY);
    const list: IPItem[] = raw ? (() => { try { return JSON.parse(raw); } catch { return []; } })() : [];
    list.push({ name: name.trim(), ip: ip.trim() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    toast({ title: t('ip_added'), description: t('blocked_ip_saved_successfully') });
    navigate('/security/ips/blocked');
  };

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

      {/* Form */}
      <div className="p-4 space-y-4 bg-white flex-1">
        <div className="space-y-2">
          <Label>{t('ip_name')}</Label>
          <Input placeholder={t('enter_ip_name')} value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
        </div>
        <div className="space-y-2">
          <Label>{t('ip')}</Label>
          <Input placeholder={t('enter_ip_for_blocked')} value={ip} onChange={(e) => setIp(e.target.value)} className="h-11" />
        </div>
        <div className="text-sm text-red-500 flex items-center gap-2">
          <Info className="w-4 h-4" />
          {t('blocked_ips_info')}
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      {/* Sticky Add */}
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md w-full p-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <Button className="w-full h-12 text-base" onClick={handleAdd}>{t('add')}</Button>
      </div>
    </MobileContainer>
  );
};
