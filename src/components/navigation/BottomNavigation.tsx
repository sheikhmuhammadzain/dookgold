import React from 'react';
import { History, ArrowDownToLine, ArrowRightLeft, Send, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useI18n();

  const navItems = [
    { id: 'history', icon: History, label: t('history'), path: '/history' },
    { id: 'deposit', icon: ArrowDownToLine, label: t('deposit'), path: '/deposit' },
    { id: 'exchange', icon: ArrowRightLeft, label: t('exchange'), path: '/exchange' },
    { id: 'send', icon: Send, label: t('send'), path: '/send' },
    { id: 'wallets', icon: Wallet, label: t('wallets'), path: '/wallets' },
  ];

  return (
    <div className="bottom-nav">
      {/* Use a simple width-constrained container instead of mobile-container to avoid min-h-screen */}
      <div className="w-full max-w-sm mx-auto p-0">
        <div className="flex justify-around py-2">
          {navItems.map(({ id, icon: Icon, label, path }) => {
            const isActive = location.pathname === path || 
              (path === '/wallets' && (location.pathname === '/balance' || location.pathname === '/wallets'));
            return (
              <Link
                key={id}
                to={path}
                className="flex flex-col items-center py-2 px-3 min-w-0"
              >
                <Icon 
                  className={`w-6 h-6 mb-1 ${
                    isActive ? 'text-brand' : 'text-nav-item'
                  }`} 
                />
                <span className={`text-xs ${
                  isActive ? 'text-brand font-medium' : 'text-nav-item'
                }`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};