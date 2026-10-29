import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const SetCoinLimitScreen: React.FC = () => {
  const navigate = useNavigate();
  const { symbol = 'BTC' } = useParams();
  const sym = symbol.toUpperCase();

  const STORAGE_24H = `dook-limit-${sym}-24h`;
  const STORAGE_MONTH = `dook-limit-${sym}-month`;

  const [tab, setTab] = useState<'24h' | 'month'>('24h');
  const [limit24h, setLimit24h] = useState<string>('');
  const [limitMonth, setLimitMonth] = useState<string>('');

  useEffect(() => {
    const v24 = localStorage.getItem(STORAGE_24H) || '';
    const vm = localStorage.getItem(STORAGE_MONTH) || '';
    setLimit24h(v24);
    setLimitMonth(vm);
  }, [STORAGE_24H, STORAGE_MONTH]);

  const label = useMemo(() => (tab === '24h' ? 'Limit (Per 24h)' : 'Limit (Per month)'), [tab]);
  const value = tab === '24h' ? limit24h : limitMonth;

  const onChange = (v: string) => {
    if (tab === '24h') setLimit24h(v); else setLimitMonth(v);
  };

  const handleSave = () => {
    if (tab === '24h') localStorage.setItem(STORAGE_24H, value.trim());
    else localStorage.setItem(STORAGE_MONTH, value.trim());
    toast({ title: 'Limit saved', description: `${sym} ${tab === '24h' ? '24h' : 'monthly'} limit updated.` });
    navigate(-1);
  };

  return (
    <MobileContainer className="bg-background pb-24">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">Set {sym} limit</h1>
          <div className="w-6 h-6" />
        </div>
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
              <label className="text-sm text-foreground">{label}</label>
              <Input
                placeholder={`0.00000000 ${sym}`}
                value={limit24h}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </TabsContent>

          <TabsContent value="month">
            <div className="mt-6 space-y-2">
              <label className="text-sm text-foreground">{label}</label>
              <Input
                placeholder={`0.00000000 ${sym}`}
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

export default SetCoinLimitScreen;
