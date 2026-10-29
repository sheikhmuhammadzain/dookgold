  import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { CryptoCard } from '@/components/crypto/CryptoCard';
import { BalanceCard } from '@/components/wallet/BalanceCard';
import { ActionButtons } from '@/components/ui/ActionButtons';
import { Menu, Bell, QrCode, Send, Download, Info, Copy, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/contexts/I18nContext';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserWallets } from '@/api/wallets';

export const WalletsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const cryptoData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: '0.00000000 BTC',
      balanceUsd: '0.00 USD',
      price: '110733.92 USD',
      change: '-3329.15',
      changePercent: '-2.91%',
      icon: '₿',
      logoSrc: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
      trend: 'down' as const
    },
    {
      symbol: 'ETH', 
      name: 'Ethereum',
      balance: '0.00000000 ETH',
      balanceUsd: '0.00 USD',
      price: '4288.79 USD',
      change: '+677.38',
      changePercent: '+18.74%',
      icon: 'Ξ',
      logoSrc: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
      trend: 'up' as const
    },
    {
      symbol: 'USDT',
      name: 'USDT',
      balance: '0.0000000 USDT',
      balanceUsd: '0.00 USD',
      price: '0.999 USD',
      change: '+0.0000789',
      changePercent: '+0.00%',
      icon: '₮',
      logoSrc: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      trend: 'up' as const
    },
    {
      symbol: 'USDC',
      name: 'USDC',
      balance: '0.000000 USDC',
      balanceUsd: '0.00 USD',
      price: '0.999 USD',
      change: '-0.000200',
      changePercent: '-0.02%',
      icon: '$',
      logoSrc: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
      trend: 'down' as const
    },
    {
      symbol: 'SHIB',
      name: 'Shibainu',
      balance: '0.000000000 SHIB',
      balanceUsd: '0.00 USD',
      price: '0.000030 USD',
      change: '+0.000002',
      changePercent: '+7.14%',
      icon: '🐕',
      logoSrc: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
      trend: 'up' as const
    }
  ];

      
  const coinRegistry: Record<string, { name: string; logo?: string; icon?: string }> = {
    BTC: { name: 'Bitcoin', logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', icon: '₿' },
    ETH: { name: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', icon: 'Ξ' },
    BNB: { name: 'BNB', logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    TRX: { name: 'Tron', logo: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png' },
    LTC: { name: 'Litecoin', logo: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
    POL: { name: 'Polygon', logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' },
    BEP2: { name: 'BNB Beacon Chain', logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    SOL: { name: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    USDT: { name: 'USDT', logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
    USDC: { name: 'USDC', logo: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
    BCH: { name: 'Bitcoin Cash', logo: 'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png' },
    DCR: { name: 'Decred', logo: 'https://assets.coingecko.com/coins/images/329/small/decred.png' },
    PEPE: { name: 'Pepe', logo: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
    UNI: { name: 'Uniswap', logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png' },
    DAI: { name: 'Dai', logo: 'https://assets.coingecko.com/coins/images/9956/small/4943.png' },
    WBTC: { name: 'Wrapped Bitcoin', logo: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png' },
    WETH: { name: 'Wrapped Ether', logo: 'https://assets.coingecko.com/coins/images/2518/small/weth.png' },
    ROX: { name: 'ROX', logo: 'https://assets.coingecko.com/coins/images/14678/small/roxe.jpg' },
    CHZ: { name: 'Chiliz', logo: 'https://assets.coingecko.com/coins/images/8834/small/Chiliz.png' },
    CTC: { name: 'Creditcoin', logo: 'https://assets.coingecko.com/coins/images/8461/small/CTC.png' },
    SAND: { name: 'Sand', logo: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg' },
    AXS: { name: 'AXS', logo: 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png' },
    AAVE: { name: 'AAVE', logo: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png' },
    LDO: { name: 'Lido DAO', logo: 'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png' },
  };

  // Local state for selected asset and flows
  const [selected, setSelected] = useState<typeof cryptoData[number] | null>(null);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [visibleSymbols, setVisibleSymbols] = useState<Set<string>>(new Set());

  // Load visible coins preference
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dook-visible-coins');
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        setVisibleSymbols(new Set(arr));
      } else {
        // default: show all current coins
        setVisibleSymbols(new Set(cryptoData.map((c) => c.symbol)));
      }
    } catch {
      setVisibleSymbols(new Set(cryptoData.map((c) => c.symbol)));
    }
  }, []);

  function enableAll() {
    const arr = cryptoData.map((c) => c.symbol);
    setVisibleSymbols(new Set(arr));
    try {
      localStorage.setItem('dook-visible-coins', JSON.stringify(arr));
    } catch {}
  }

  // Send form state
  const [sendNetwork, setSendNetwork] = useState('ERC20');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<string>('');
  const commissionPct = 0.5; // 0.5%
  const numericAmount = useMemo(() => {
    const n = parseFloat(amount);
    return Number.isFinite(n) ? n : 0;
  }, [amount]);
  const commission = useMemo(() => (numericAmount * commissionPct) / 100, [numericAmount]);

  // Receive state
  const [receiveNetwork, setReceiveNetwork] = useState('ERC20');

  const networks = ['ERC20', 'TRC20', 'BEP20', 'SOL'];

  // Load real wallets from API
  const { data: walletsResp } = useQuery({
    queryKey: ['current_user_wallets'],
    queryFn: () => getCurrentUserWallets(),
    staleTime: 60_000,
  });
  const wallets = walletsResp?.data || [];

  const symbolToChain = (sym: string) => {
    const s = sym.toUpperCase();
    if (s === 'BTC') return 'BTC';
    if (s === 'ETH' || s === 'USDT' || s === 'USDC' || s === 'SHIB' || s === 'WBTC' || s === 'WETH' || s === 'DAI') return 'ETH';
    if (s === 'BNB' || s === 'BEP2') return 'BSC';
    if (s === 'SOL') return 'SOL';
    return 'ETH';
  };

  function handleOpenActions(crypto: typeof cryptoData[number]) {
    setSelected(crypto);
    setActionsOpen(true);
  }

  function openSend() {
    setActionsOpen(false);
    navigate('/send');
  }

  function openReceive() {
    setActionsOpen(false);
    setReceiveOpen(true);
  }

  const walletAddress = useMemo(() => {
    if (!selected) return '';
    const chain = symbolToChain(selected.symbol);
    const real = wallets.find((w: any) => (w.chainType || '').toUpperCase() === chain)?.publicAddress as string | undefined;
    if (real) return real;
    // Fallback deterministic mock address based on symbol + network when API not available
    const base = btoa(`${selected.symbol}-${receiveNetwork}`).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);
    return `0x${base.toLowerCase()}`;
  }, [selected, receiveNetwork, wallets]);

  const qrUrl = useMemo(() => {
    const data = walletAddress || '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(data)}`;
  }, [walletAddress]);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: you can integrate your toast system here
    } catch (e) {
      // no-op
    }
  }

  async function shareText(title: string, text: string) {
    try {
      if (navigator.share) {
        await navigator.share({ title, text });
      } else {
        await copyToClipboard(text);
      }
    } catch (e) {
      // user cancelled or not supported
    }
  }

  // Build display list = base coins + any extra coins enabled in Manage Coins
  const displayCoins = useMemo(() => {
    const bySymbol = new Map<string, typeof cryptoData[number]>();
    for (const c of cryptoData) bySymbol.set(c.symbol, c);
    if (visibleSymbols.size > 0) {
      visibleSymbols.forEach((sym) => {
        if (!bySymbol.has(sym)) {
          const reg = coinRegistry[sym];
          if (reg) {
            bySymbol.set(sym, {
              symbol: sym,
              name: reg.name,
              balance: `0.00000000 ${sym}`,
              balanceUsd: '0.00 USD',
              price: '—',
              change: '+0.00',
              changePercent: '+0.00%',
              icon: reg.icon || sym[0],
              logoSrc: reg.logo,
              trend: 'up' as const,
            });
          }
        }
      });
    } else {
      // No saved selection: show ALL known coins (base + registry)
      Object.keys(coinRegistry).forEach((sym) => {
        if (!bySymbol.has(sym)) {
          const reg = coinRegistry[sym];
          bySymbol.set(sym, {
            symbol: sym,
            name: reg.name,
            balance: `0.00000000 ${sym}`,
            balanceUsd: '0.00 USD',
            price: '—',
            change: '+0.00',
            changePercent: '+0.00%',
            icon: reg.icon || sym[0],
            logoSrc: reg.logo,
            trend: 'up' as const,
          });
        }
      });
    }
    return Array.from(bySymbol.values());
  }, [cryptoData, visibleSymbols]);

  const filtered = visibleSymbols.size === 0
    ? displayCoins
    : displayCoins.filter((c) => visibleSymbols.has(c.symbol));

  return (
    <MobileContainer className="bg-background pb-24">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="grid grid-cols-3 items-center">
          <Link to="/profile" aria-label="Profile" className="justify-self-start">
            <Menu className="w-6 h-6 text-white" />
          </Link>
          <Link to="/balance" aria-label="Wallets overview" className="justify-self-center">
            <h1 className="text-lg font-semibold text-white text-center">{t('wallets')}</h1>
          </Link>
          <div className="flex items-center gap-3 justify-self-end">
            <Link to="/notifications/history" aria-label="Notifications">
              <Bell className="w-6 h-6 text-white" />
            </Link>
            <Link to="/qr" aria-label="App QR">
              <QrCode className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-2">
        <BalanceCard
          totalBalance="0.00"
          change="-0.00"
          changePercent="0.00%"
          variant="brand"
        />
      </div>

      {/* All coins section */}
      <div className="px-2 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <ActionButtons />
          <div className="flex items-center gap-3 text-right">
            <h2 className="text-lg font-semibold text-foreground">{t('all_coins')}</h2>
            <span className="text-xs text-brand bg-brand/10 px-2 py-0.5 rounded-full">
              {filtered.length}
            </span>
            <button onClick={enableAll} className="text-xs underline text-brand">{t('show_all')}</button>
          </div>
        </div>

        {/* Crypto list */}
        <div className="space-y-2 ">
          {filtered.map((crypto, index) => (
            <CryptoCard
              key={index}
              {...crypto}
              onClick={() =>
                navigate(`/market/${crypto.symbol}`, {
                  state: {
                    crypto,
                  },
                })
              }
              onIconClick={() => handleOpenActions(crypto)}
            />
          ))}
        </div>
      </div>

      <BottomNavigation />

      {/* Action Sheet: 3 options */}
      <Sheet open={actionsOpen} onOpenChange={setActionsOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 pb-8">
          <SheetHeader>
            <SheetTitle>
              {selected ? `${selected.name} (${selected.symbol})` : t('actions')}
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <Button onClick={openSend} className="flex flex-col gap-2 py-6" variant="secondary">
              <Send className="w-5 h-5" />
              <span className="text-sm">{t('send')}</span>
            </Button>
            <Button onClick={openReceive} className="flex flex-col gap-2 py-6" variant="secondary">
              <Download className="w-5 h-5" />
              <span className="text-sm">{t('receive')}</span>
            </Button>
            <Button
              className="flex flex-col gap-2 py-6"
              variant="secondary"
              onClick={() => {
                if (selected) {
                  navigate(`/market/${selected.symbol}`, { state: { crypto: selected } });
                }
              }}
            >
              <Info className="w-5 h-5" />
              <span className="text-sm">{t('details')}</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Send Sheet */}
      <Sheet open={sendOpen} onOpenChange={setSendOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 pb-8">
          <SheetHeader>
            <SheetTitle>{t('send')} {selected?.symbol}</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-4">
            {/* Network */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">{t('network')}</label>
              <Select value={sendNetwork} onValueChange={setSendNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_network')} />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recipient */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">{t('recipient_address')}</label>
              <Input
                placeholder="Paste or type recipient address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">{t('amount')} ({selected?.symbol})</label>
              <Input
                placeholder={`0.00 ${selected?.symbol ?? ''}`}
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="text-xs text-foreground-muted">
                {t('fee')} ({commissionPct}%):{' '}
                <span className="text-foreground font-medium">{commission.toFixed(6)} {selected?.symbol}</span>
              </div>
            </div>

            <Button
              className="w-full h-11"
              disabled={!recipient || numericAmount <= 0}
              onClick={() => setSendOpen(false)}
            >
              {t('send')} {amount || ''} {selected?.symbol}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Receive Sheet */}
      <Sheet open={receiveOpen} onOpenChange={setReceiveOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 pb-8">
          <SheetHeader>
            <SheetTitle>{t('receive')} {selected?.symbol}</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-4">
            {/* Network selector */}
            <div className="space-y-2">
              <label className="text-sm text-foreground-muted">{t('network')}</label>
              <Select value={receiveNetwork} onValueChange={setReceiveNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_network')} />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* QR code */}
            <div className="w-full flex justify-center">
              <div className="p-3 bg-white rounded-xl border border-card-border">
                {/* Use external QR generator to avoid extra deps */}
                <img src={qrUrl} alt="Wallet QR" className="w-52 h-52 object-contain" />
              </div>
            </div>

            {/* Address, copy & share */}
            <div className="space-y-2">
              <div className="text-sm text-foreground-muted">Wallet address ({receiveNetwork})</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-md bg-card border border-card-border text-sm truncate">
                  {walletAddress}
                </div>
                <Button variant="secondary" size="icon" aria-label="Copy address" onClick={() => copyToClipboard(walletAddress)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" aria-label="Share address" onClick={() => shareText(`${selected?.symbol} ${receiveNetwork} address`, walletAddress)}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </MobileContainer>
  );
};