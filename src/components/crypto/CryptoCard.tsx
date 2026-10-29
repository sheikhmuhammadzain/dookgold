import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CryptoCardProps {
  symbol: string;
  name: string;
  balance: string;
  balanceUsd: string;
  price: string;
  change: string;
  changePercent: string;
  icon?: string;
  logoSrc?: string; // optional image logo
  trend: 'up' | 'down';
  onClick?: () => void;
  onIconClick?: () => void;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  symbol,
  name,
  balance,
  balanceUsd,
  price,
  change,
  changePercent,
  icon,
  logoSrc,
  trend,
  onClick,
  onIconClick
}) => {
  return (
    <div
      onClick={onClick}
      className="crypto-item flex items-center justify-between p-4 bg-card rounded-2xl border border-card-border cursor-pointer hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Crypto Icon */}
        <div
          role="button"
          tabIndex={0}
          className="shrink-0"
          onClick={(e) => { e.stopPropagation(); onIconClick?.(); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onIconClick?.(); }
          }}
          aria-label={`${name} market`}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${name} logo`}
              className="w-10 h-10 rounded-full object-contain bg-white border border-card-border"
              loading="lazy"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-50 border border-card-border flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-600">{icon}</span>
            </div>
          )}
        </div>
        
        {/* Crypto Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-base text-foreground truncate max-w-[9rem]">{name}</h3>
            <span className="text-sm text-foreground-muted shrink-0">{symbol}</span>
          </div>
          <p className="text-xs text-foreground-muted truncate">{balanceUsd}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Price and Chart */}
        <div className="text-right flex-shrink-0">
          <p className="font-semibold text-sm sm:text-base text-foreground whitespace-nowrap">{price}</p>
          <div className="flex items-center justify-end gap-1">
            <span className={`text-xs font-medium ${
              trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              {change}
            </span>
            <span className={`text-xs ${
              trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              ({changePercent})
            </span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-foreground-muted" />
      </div>
    </div>
  );
}
;