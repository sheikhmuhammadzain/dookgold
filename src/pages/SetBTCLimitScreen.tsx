import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const STORAGE_24H = 'dook-limit-btc-24h';
const STORAGE_MONTH = 'dook-limit-btc-month';

export const SetBTCLimitScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'24h' | 'month'>('24h');
  const [limit24h, setLimit24h] = useState<string>('');
  const [limitMonth, setLimitMonth] = useState<string>('');

  useEffect(() => {
    const v24 = localStorage.getItem(STORAGE_24H) || '';
    const vm = localStorage.getItem(STORAGE_MONTH) || '';
    setLimit24h(v24);
    setLimitMonth(vm);
  }, []);

  const label = useMemo(() => (tab === '24h' ? 'Limit (Per 24h)' : 'Limit (Per month)'), [tab]);
  const value = tab === '24h' ? limit24h : limitMonth;

  const onChange = (v: string) => {
    // allow only digits and decimal point, up to 8 decimals (BTC)
    if (!/^\d*(?:\.|\d{0,8})?$/.test(v)) {
      // still set raw value to avoid blocking typing, but keep it simple for demo
    }
    if (tab === '24h') setLimit24h(v); else setLimitMonth(v);
  };

  const handleSave = () => {
    if (tab === '24h') localStorage.setItem(STORAGE_24H, value.trim());
    else localStorage.setItem(STORAGE_MONTH, value.trim());
    toast({ title: 'Limit saved', description: `BTC ${tab === '24h' ? '24h' : 'monthly'} limit updated.` });
    // Navigate to currencies page as requested
    navigate('/currencies');
  };

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">Set BTC limit</h1>
        </div>
        <div className="w-6" />
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as '24h' | 'month')}>
          <TabsList className="w-full h-10 rounded-full bg-gray-100 p-1">
            <TabsTrigger value="24h" className={`flex-1 rounded-full ${tab === '24h' ? 'bg-brand text-white' : ''}`}>Per 24h</TabsTrigger>
            <TabsTrigger value="month" className={`flex-1 rounded-full ${tab === 'month' ? 'bg-brand text-white' : ''}`}>Per month</TabsTrigger>
          </TabsList>

          <TabsContent value="24h">
            <div className="mt-6 space-y-2">
              <label className="text-sm text-foreground">Limit (Per 24h)</label>
              <Input
                placeholder="0.00000000 BTC"
                value={limit24h}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </TabsContent>

          <TabsContent value="month">
            <div className="mt-6 space-y-2">
              <label className="text-sm text-foreground">Limit (Per month)</label>
              <Input
                placeholder="0.00000000 BTC"
                value={limitMonth}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky footer */}
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md w-full p-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <Button className="w-full h-12 text-base" onClick={handleSave}>Enable</Button>
      </div>
    </MobileContainer>
  );
};
