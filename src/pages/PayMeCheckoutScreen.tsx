import React, { useMemo } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Copy, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/contexts/I18nContext';

interface State {
  crypto?: { symbol: string; name?: string };
  linkName: string;
  amount?: string;
  currency?: string;
}

export const PayMeCheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const state = (location.state || {}) as State;
  const { t } = useI18n();

  const linkFromParam = params.linkName as string | undefined;
  const qs = new URLSearchParams(location.search);
  const amountQ = qs.get('amount') || '';
  const currencyQ = qs.get('currency') || state.crypto?.symbol || 'USDT';

  const linkName = state.linkName || linkFromParam || 'link';
  const amount = (state.amount && state.amount.length > 0 ? state.amount : amountQ) || '';
  const currency = state.currency || currencyQ;
  const symbol = state.crypto?.symbol || (params.symbol as string) || currency || 'ASSET';

  const address = useMemo(() => {
    const base = btoa(`${symbol}-paylink`).replace(/[^a-zA-Z0-9]/g, '').slice(0, 34);
    return `0x${base.toLowerCase()}`;
  }, [symbol]);

  const displayAmount = amount && amount.length > 0 ? `${amount} ${currency || symbol}` : `Any amount of ${currency || symbol}`;
  // NOTE: 'Any amount of' is localized via t('any_amount_of') below when displayed
  const qrData = useMemo(() => `${symbol}:${address}?amount=${amount || ''}&currency=${currency || symbol}&note=${encodeURIComponent(linkName || '')}`, [symbol, address, amount, currency, linkName]);
  const qrUrl = useMemo(() => `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrData)}`, [qrData]);

  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); } catch {}
  }
  async function share(text: string) {
    try {
      if (navigator.share) await navigator.share({ title: 'PayMe', text });
      else await copy(text);
    } catch {}
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">{t('send')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* QR section */}
        <div className="rounded-xl border border-card-border bg-card p-3 flex flex-col items-center gap-3">
          <img src={qrUrl} alt={t('pay_qr')} className="w-56 h-56" />
        </div>

        {/* Address */}
        <div className="rounded-xl border border-card-border bg-card p-3 space-y-2">
          <div className="text-sm font-medium">{t('address')}</div>
          <div className="flex items-center gap-2">
            <Input readOnly className="font-mono" value={address} />
            <Button variant="secondary" size="icon" aria-label="Share address" onClick={() => share(address)}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon" aria-label="Copy address" onClick={() => copy(address)}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Amount */}
        <div className="rounded-xl border border-card-border bg-card p-3 space-y-1">
          <div className="text-sm font-medium">{t('amount')}</div>
          <div className="text-sm text-foreground-muted">{amount && amount.length > 0 ? `${amount} ${currency || symbol}` : `${t('any_amount_of')} ${currency || symbol}`}</div>
        </div>

        <Button variant="secondary" className="w-full h-11">
          {t('to_dook_gold')}
        </Button>
      </div>
    </MobileContainer>
  );
};

export default PayMeCheckoutScreen;
