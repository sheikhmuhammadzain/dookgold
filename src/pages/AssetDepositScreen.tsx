import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, QrCode, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';
import { getCheckoutUrl } from '@/api/moonpay';

interface CryptoState {
  symbol: string;
  name: string;
  logoSrc?: string;
  icon?: string;
  balance?: string;
  balanceUsd?: string;
}

export const AssetDepositScreen: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const { t } = useI18n();
  const { toast } = useToast();
  const crypto: CryptoState | undefined = state?.crypto;
  const symbol = crypto?.symbol || params.symbol || 'ASSET';
  const name = crypto?.name || symbol;

  const networkOptions = [
    { value: 'Bitcoin', label: 'Bitcoin' },
    { value: 'ERC20', label: 'ERC20 (Ethereum)' },
    { value: 'TRC20', label: 'TRC20 (TRON)' },
    { value: 'BEP20', label: 'BEP20 (BSC)' },
    { value: 'BEP2', label: 'BEP2 (BNB Beacon)' },
    { value: 'SOL', label: 'SOL (Solana)' },
    { value: 'Polygon', label: 'Polygon (PoS)' },
    { value: 'Avalanche', label: 'Avalanche C-Chain' },
    { value: 'Arbitrum', label: 'Arbitrum One' },
    { value: 'Optimism', label: 'Optimism' },
    { value: 'Base', label: 'Base' },
    { value: 'Litecoin', label: 'Litecoin' },
  ];
  const [network, setNetwork] = useState(networkOptions[0].value);
  const [showQR, setShowQR] = useState(false);
  const [comment, setComment] = useState('');

  const walletAddress = useMemo(() => {
    const base = btoa(`${symbol}-${network}-deposit`).replace(/[^a-zA-Z0-9]/g, '').slice(0, 34);
    return `0x${base.toLowerCase()}`;
  }, [symbol, network]);

  const qrUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(walletAddress)}`;
  }, [walletAddress]);

  async function copyToClipboard(text: string) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      toast({ title: t('address_copied'), description: t('copied_to_clipboard') });
    } catch (_) {
      toast({ title: t('copy_failed'), description: t('select_and_copy_key_manually') });
    }
  }

  async function shareText(title: string, text: string) {
    try {
      if (navigator.share) { await navigator.share({ title, text }); }
      else { await copyToClipboard(text); }
    } catch {}
  }

  const shortAddress = (addr: string) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '');

  async function handleBuy() {
    try {
      const url = await getCheckoutUrl(walletAddress, 'usd');
      if (typeof url === 'string' && url.startsWith('http')) {
        window.location.href = url;
      } else {
        throw new Error('Invalid checkout URL');
      }
    } catch (e: any) {
      toast({ title: t('error'), description: e?.message || 'Failed to get checkout URL' });
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
          <h1 className="text-lg font-semibold text-white">{t('deposit')}</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Asset header */}
        <div className="flex items-center justify-between rounded-xl border border-card-border bg-card px-3 py-3">
          <div className="flex items-center gap-3">
            {crypto?.logoSrc ? (
              <img src={crypto.logoSrc} alt={`${name} logo`} className="w-8 h-8 rounded-full bg-white" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center text-sm">
                {crypto?.icon || symbol?.[0]}
              </div>
            )}
            <div>
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-foreground-muted">{t('your_wallet')}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{crypto?.balance || `0.00000000 ${symbol}`}</div>
            <div className="text-xs text-foreground-muted">{crypto?.balanceUsd || '0.00 USD'}</div>
          </div>
        </div>

        {/* Network row */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{t('network')}</div>
            <div className="w-40">
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_network')} />
                </SelectTrigger>
                <SelectContent>
                  {networkOptions.map((n) => (
                    <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="rounded-xl border border-green-300 bg-green-50 text-green-700 px-3 py-2 text-sm">
          {t('copy_address_or_scan_qr')}
        </div>

        {/* Address field */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{t('wallet_address_legacy')}</div>
            <div className="text-xs text-foreground-muted">{network}</div>
          </div>
          <Input readOnly value={walletAddress} className="font-mono" />
          <div className="flex items-center gap-2">
            <Button className="flex-1" variant="secondary" onClick={() => shareText(`${symbol} ${t('deposit').toLowerCase()} ${t('address')}`, walletAddress)}>
              <Share2 className="w-4 h-4" /> {t('share')}
            </Button>
            <Button className="flex-1" variant="secondary" onClick={() => copyToClipboard(walletAddress)}>
              <Copy className="w-4 h-4" /> {t('copy')}
            </Button>
          </div>
        </div>

        {/* Internal comment */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3 space-y-2">
          <label className="text-sm font-medium">{t('internal_comment')}</label>
          <div className="flex items-center gap-2">
            <Input placeholder={t('leave_a_comment')} value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button variant="secondary" size="icon" aria-label={t('save_comment')}>
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* QR toggle */}
        <Button variant="secondary" className="w-full h-11" onClick={() => setShowQR((s) => !s)}>
          <QrCode className="w-4 h-4" /> {showQR ? t('hide_qr') : t('show_qr')}
        </Button>
        {showQR && (
          <div className="w-full flex justify-center">
            <div className="p-3 bg-white rounded-xl border border-card-border">
              <img src={qrUrl} alt={t('deposit_qr')} className="w-52 h-52 object-contain" />
            </div>
          </div>
        )}

        {/* Buy with MoonPay */}
        <Button className="w-full h-11" variant="default" onClick={handleBuy}>
          {t('buy')} {name} (MoonPay)
        </Button>

        {/* PayMe link */}
        <Link to={`/payme/${symbol}`} state={{ crypto }} className="block">
          <Button className="w-full h-11" variant="default">
            {t('payme_link')}
          </Button>
        </Link>
      </div>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default AssetDepositScreen;
