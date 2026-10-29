import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Shuffle, Plus, Minus } from 'lucide-react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/contexts/I18nContext';

interface CryptoState {
  symbol: string;
  name: string;
}

function randomName() {
  // simple readable random string
  const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india'];
  const a = words[Math.floor(Math.random() * words.length)];
  const b = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, '0');
  return `${a}-${b}`;
}

export const PayMeLinkScreen: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const { toast } = useToast();
  const { t } = useI18n();

  const crypto: CryptoState | undefined = state?.crypto;
  const symbol = crypto?.symbol || (params.symbol as string) || 'ASSET';

  const [linkName, setLinkName] = useState(randomName());
  const [showAmount, setShowAmount] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(symbol);

  const baseUrl = 'https://dookgold.app/pay';
  const fullUrl = useMemo(() => {
    const url = new URL(`${baseUrl}/${encodeURIComponent(linkName || 'link')}`);
    if (showAmount && amount) {
      url.searchParams.set('amount', amount);
      url.searchParams.set('currency', currency);
    }
    return url.toString();
  }, [linkName, showAmount, amount, currency]);

  function handleSave() {
    // For now, copy to clipboard and show toast to mimic save
    try {
      navigator.clipboard.writeText(fullUrl);
      toast({ title: t('link_saved'), description: t('payme_link_copied') });
    } catch {
      toast({ title: t('link_saved'), description: t('payme_link_ready') });
    }
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('payme_link')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* URL preview */}
        <button
          type="button"
          className="text-left text-sm rounded-lg border border-card-border bg-card px-3 py-2 active:opacity-80"
          onClick={() => {
            const url = new URL(`/pay/${linkName || 'link'}`, window.location.origin);
            if (showAmount && amount) {
              url.searchParams.set('amount', amount);
              url.searchParams.set('currency', currency);
            }
            navigate(url.pathname + url.search);
          }}
          aria-label={t('payme_link')}
        >
          <span className="text-foreground-muted">{baseUrl}/</span>
          <span className="text-brand font-medium underline">{linkName || 'link'}</span>
        </button>

        {/* Link name */}
        <div className="flex items-center gap-2">
          <Input placeholder={t('link_name')} value={linkName} onChange={(e) => setLinkName(e.target.value)} />
          <Button type="button" variant="secondary" size="icon" aria-label={t('link_name')} onClick={() => setLinkName(randomName())}>
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>

        {/* Amount toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm">{t('enter_amount_optional')}</div>
          <Button type="button" variant="secondary" size="icon" onClick={() => setShowAmount((s) => !s)} aria-label={showAmount ? t('hide_amount') : t('add_amount')}>
            {showAmount ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
        </div>

        {showAmount && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="0.000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <div className="w-32">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder={t('currency_label')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={symbol}>{symbol}</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <p className="text-xs text-foreground-muted">{t('if_enter_amount_only_that_amount')}</p>

        <Button className="w-full h-11" onClick={handleSave}>
          {t('save_link')}
        </Button>
      </div>
    </MobileContainer>
  );
};

export default PayMeLinkScreen;
