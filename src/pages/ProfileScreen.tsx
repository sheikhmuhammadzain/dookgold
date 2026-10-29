import React, { useEffect, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { X, ChevronRight } from 'lucide-react';
import { 
  User, 
  Shield, 
  BarChart3, 
  Bell, 
  HelpCircle, 
  Megaphone, 
  Star, 
  Palette, 
  Globe, 
  LogOut 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [username, setUsername] = useState<string>('Nayabkhan khan');
  const [rateOpen, setRateOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const { t } = useI18n();

  useEffect(() => {
    const saved = localStorage.getItem('dook-username');
    if (saved) setUsername(saved);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/welcome', { replace: true });
  };

  const openRateDialog = () => {
    try {
      const prev = localStorage.getItem('dook-rated');
      if (prev) setRating(parseInt(prev) || 0);
    } catch {}
    setRateOpen(true);
  };

  const handleDoneRate = () => {
    try { localStorage.setItem('dook-rated', String(rating)); } catch {}
    setRateOpen(false);
  };

  const menuItems = [
    { icon: User, label: t('profile'), color: 'text-brand', path: '/profile/details' },
    { icon: Shield, label: t('security'), color: 'text-brand', path: '/security' },
    { icon: BarChart3, label: t('limits'), color: 'text-brand', path: '/limits' },
    { icon: Bell, label: t('notifications'), color: 'text-brand', path: '/notifications' },
    { icon: HelpCircle, label: t('help'), color: 'text-brand', path: '/help' },
    { icon: Megaphone, label: t('affiliate_program'), color: 'text-brand', path: '/affiliate' },
    { icon: Star, label: t('rate_us'), color: 'text-brand', action: openRateDialog },
    { icon: Palette, label: t('theme_mode'), color: 'text-brand', path: '/theme' },
    { icon: Globe, label: t('language'), color: 'text-brand', path: '/language' },
    { icon: LogOut, label: t('sign_out'), color: 'text-brand', action: handleSignOut },
  ];

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="bg-brand px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/wallets">
            <X className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-lg font-semibold text-white">{username}</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 bg-white">
        {menuItems.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            {item.action ? (
              <div 
                onClick={item.action}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-base text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </div>
            ) : (
              <Link to={item.path} className="block">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-base text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground-muted" />
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Rate Us Dialog */}
      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent className="sm:max-w-sm rounded-2xl p-0 overflow-hidden">
          <div className="p-5 pb-3">
            <DialogHeader>
              <DialogTitle className="text-center">{t('do_you_like_it')}</DialogTitle>
              <DialogDescription className="text-center">{t('rate_our_app')}</DialogDescription>
            </DialogHeader>
          </div>
          <div className="px-5 pb-5">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((i) => (
                <button key={i} onClick={() => setRating(i)} aria-label={`Rate ${i} star`} className="p-1">
                  <Star className={`w-8 h-8 ${i <= rating ? 'text-brand' : 'text-foreground-muted'}`} fill={i <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <div className="text-center mb-3">
              <button className="text-brand font-medium" onClick={() => setRateOpen(false)}>{t('remind_me_later')}</button>
            </div>
            <Button className="w-full h-11" onClick={handleDoneRate}>{t('done')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileContainer>
  );
};