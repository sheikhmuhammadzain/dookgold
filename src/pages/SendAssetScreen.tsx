import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserWallets } from '@/api/wallets';
import { estimateFee } from '@/api/transactions';

interface CryptoState {
  symbol: string;
  name: string;
  logoSrc?: string;
  icon?: string;
  balance?: string;
  balanceUsd?: string;
}

export const SendAssetScreen: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const crypto: CryptoState | undefined = state?.crypto;
  const { t } = useI18n();

  const symbol = crypto?.symbol || params.symbol || 'ASSET';
  const name = crypto?.name || symbol;

  const networks = [
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

  const [network, setNetwork] = useState<string>(networks[0].value);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [estimation, setEstimation] = useState<string>('');

  const numericAmount = useMemo(() => {
    const n = parseFloat(amount);
    return Number.isFinite(n) ? n : 0;
  }, [amount]);

  const canSend = recipient.trim().length > 0 && numericAmount > 0;

  // Load wallets to determine 'from' address
  const { data: walletsResp } = useQuery({
    queryKey: ['current_user_wallets'],
    queryFn: () => getCurrentUserWallets(),
    staleTime: 60_000,
  });
  const wallets = walletsResp?.data || [];

  const symbolToChain = (sym: string) => {
    const s = sym.toUpperCase();
    if (s === 'BTC') return 'btc';
    if (s === 'ETH' || s === 'USDT' || s === 'USDC' || s === 'SHIB' || s === 'WBTC' || s === 'WETH' || s === 'DAI') return 'eth';
    if (s === 'BNB' || s === 'BEP2') return 'bsc';
    if (s === 'SOL') return 'sol';
    return 'eth';
  };

  const fromAddress = useMemo(() => {
    const chainUpper = symbolToChain(symbol).toUpperCase();
    const match = wallets.find((w: any) => (w.chainType || '').toUpperCase() === chainUpper);
    return match?.publicAddress as string | undefined;
  }, [wallets, symbol]);

  // Estimate fee whenever inputs are valid
  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setEstimation('');
        if (!fromAddress || !canSend) return;
        const chain = symbolToChain(symbol);
        const res = await estimateFee({ chain, from: fromAddress, to: recipient.trim(), amount: numericAmount });
        if (!cancelled) {
          const asText = typeof res === 'string' ? res : JSON.stringify(res);
          setEstimation(asText);
        }
      } catch (e: any) {
        if (!cancelled) setEstimation('');
      }
    }
    run();
    return () => { cancelled = true; };
  }, [fromAddress, recipient, numericAmount, symbol, canSend]);

  function handleSend() {
    if (!canSend) return;
    // Require OTP / fingerprint verification right when sending
    navigate('/confirm/otp', {
      state: {
        nextPath: `/send/${symbol}/success`,
        nextState: {
          symbol,
          name,
          amount: numericAmount,
          recipient,
          network,
          comment,
        },
        context: 'send',
      },
    });
  }

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">Send</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-3 space-y-4">
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
              <div className="text-xs text-foreground-muted">Main Wallet</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{crypto?.balance || `0.00000000 ${symbol}`}</div>
            <div className="text-xs text-foreground-muted">{crypto?.balanceUsd || '0.00 USD'}</div>
          </div>
        </div>

        {/* Network */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">To</div>
            <div className="w-40">
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_network')} />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((n) => (
                    <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <label className="text-sm text-foreground-muted">Wallet address</label>
            <Input
              placeholder="Paste or type recipient address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
        </div>

        {/* Amount */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3 space-y-2">
          <label className="text-sm font-medium">Enter amount</label>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <Input
              placeholder={`0.00 ${symbol}`}
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="text-sm text-foreground-muted font-medium">{symbol}</div>
          </div>
          {estimation && (
            <div className="text-xs text-foreground-muted">Estimated fee: {estimation}</div>
          )}
          {numericAmount > 0 && (
            <div className="text-xs text-red-500">The network fee exceeds your balance.</div>
          )}
        </div>

        {/* Internal comment */}
        <div className="rounded-xl border border-card-border bg-card px-3 py-3 space-y-2">
          <label className="text-sm font-medium">Internal comment</label>
          <Input placeholder="Add a note (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <Button className="w-full h-11" disabled={!canSend} onClick={handleSend}>
          Send
        </Button>
      </div>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default SendAssetScreen;
