import React from 'react';
import { useI18n } from '@/contexts/I18nContext';

interface BalanceCardProps {
  totalBalance: string | number;
  change: string;
  changePercent: string;
  lastTransaction?: string;
  className?: string;
  variant?: 'default' | 'brand' | 'glass';
  currency?: string; // e.g. 'USD'
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance,
  change,
  changePercent,
  lastTransaction = "No transactions yet",
  className = "",
  variant = 'default',
  currency = 'USD'
}) => {
  const { t } = useI18n();
  const isBrand = variant === 'brand';
  const isGlass = variant === 'glass';
  
  // Parse incoming totalBalance to a number safely
  const amountNumber = (() => {
    const num = typeof totalBalance === 'string'
      ? parseFloat(totalBalance.replace(/,/g, ''))
      : totalBalance;
    return Number.isFinite(num) ? (num as number) : 0;
  })();

  // Format currency and split into parts so we can style the symbol separately
  const moneyParts = (() => {
    const nf = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const parts = nf.formatToParts(amountNumber);
    const symbol = parts.find(p => p.type === 'currency')?.value ?? '';
    const sign = parts.find(p => p.type === 'minusSign')?.value ?? '';
    const number = parts
      .filter(p => ['integer', 'group', 'decimal', 'fraction'].includes(p.type))
      .map(p => p.value)
      .join('');
    return { symbol, sign, number };
  })();

  return (
    <div
      className={`rounded-2xl p-6  border shadow-sm ${
        isGlass
          ? 'bg-white/10 border-white/20 backdrop-blur-md text-white shadow-lg shadow-black/10'
          : isBrand
          ? 'bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-surface-foreground))] border-transparent'
          : 'bg-card border-card-border'
      } ${className}`}
    >
      <div className="text-center">
        <p className={`text-sm mb-2 ${isGlass ? 'text-white/80' : isBrand ? 'text-[hsl(var(--brand-surface-foreground))]/80' : 'text-foreground-muted'}`}>{t('total_balance')}</p>
        <h1 className={`text-4xl font-bold mb-1 ${isGlass ? 'text-white' : isBrand ? 'text-[hsl(var(--brand-surface-foreground))]' : 'text-foreground'} flex items-baseline justify-center gap-1 tracking-tight`}>
          {/* Currency symbol */}
          <span className={`align-top leading-none ${isGlass ? 'text-white/90' : isBrand ? 'text-[hsl(var(--brand-surface-foreground))]/90' : 'text-brand'} text-2xl md:text-3xl`}>
            {moneyParts.symbol}
          </span>
          {/* Number with tabular lining for steadier look */}
          <span className="tabular-nums">
            {moneyParts.sign}{moneyParts.number}
          </span>
          {/* Subtle currency code pill */}
          <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${isGlass ? 'bg-white/15 text-white/90' : isBrand ? 'bg-[hsl(var(--brand-surface-foreground))]/10 text-[hsl(var(--brand-surface-foreground))]' : 'bg-brand/10 text-brand'}`}>
            {currency}
          </span>
        </h1>
        <p className={`text-sm ${isGlass ? 'text-white/80' : isBrand ? 'text-[hsl(var(--brand-surface-foreground))]/80' : 'text-foreground-muted'}`}>
          {change} ({changePercent})
        </p>
      </div>

      <div className={`mt-6 pt-4 border-t ${isGlass ? 'border-white/20' : isBrand ? 'border-white/15' : 'border-card-border'}`}>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${isGlass ? 'text-white/80' : isBrand ? 'text-[hsl(var(--brand-surface-foreground))]/80' : 'text-foreground-muted'}`}>{t('last_transaction')}:</span>
          <span className={`text-sm ${isGlass ? 'text-white/80' : isBrand ? 'text-[hsl(var(--brand-surface-foreground))]/80' : 'text-foreground-muted'}`}>{lastTransaction || t('no_transactions')}</span>
        </div>
      </div>
    </div>
  );
};