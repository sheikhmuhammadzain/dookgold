import React, { useMemo } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Megaphone, ExternalLink, Copy, Share2 } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

function getOrCreateAffiliateCode() {
  let code = localStorage.getItem('dook-affiliate-code');
  if (!code) {
    code = Math.random().toString(36).slice(2, 10).toUpperCase();
    localStorage.setItem('dook-affiliate-code', code);
  }
  return code;
}

export const AffiliateProgramScreen: React.FC = () => {
  const navigate = useNavigate();
  const code = useMemo(() => getOrCreateAffiliateCode(), []);

  const landingUrl = `https://dookgold.com/invite/${code}`;
  const appUrl = `https://dookgold.com/invite-app/${code}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(landingUrl)}&text=${encodeURIComponent('Join me on Dook Gold')}`;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied to clipboard' });
    } catch {
      toast({ title: 'Copy failed', description: 'Select and copy the link manually.' });
    }
  };

  const share = async (text: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ url: text, text: 'Invite to Dook Gold' });
      } else {
        await copy(text);
      }
    } catch {
      // user cancelled; ignore
    }
  };

  const Card: React.FC<{ title: string; url: string; copyLabel?: string; shareHref?: string }>
    = ({ title, url, copyLabel = 'Copy', shareHref }) => (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-4">
        <div className="text-foreground font-medium mb-2">{title}</div>
        <Input value={url} readOnly className="h-11" />
      </div>
      <div className="p-4 bg-blue-50 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-11" onClick={() => copy(url)}>
          <Copy className="w-4 h-4 mr-2" /> {copyLabel}
        </Button>
        {shareHref ? (
          <a href={shareHref} target="_blank" rel="noreferrer" className="block">
            <Button className="w-full h-11">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </a>
        ) : (
          <Button className="h-11" onClick={() => share(url)}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <MobileContainer className="bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-foreground">Affiliate Program</h1>
        </div>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* Hero */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center">
            <Megaphone className="w-8 h-8 text-brand" />
          </div>
        </div>
          <div className="text-xl font-semibold text-foreground">Invite friends and earn</div>
          <div className="text-sm text-foreground-muted mt-1">Share the links and get crypto for each friend who started using Dook Gold.</div>
          <a
            href="https://dookgold.com/affiliate"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center w-full h-11 rounded-lg bg-blue-50 text-foreground hover:bg-blue-100"
          >
            More About Affiliate <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="landing">
          <TabsList className="w-full h-10 rounded-full bg-gray-100 p-1">
            <TabsTrigger value="landing" className="flex-1 rounded-full data-[state=active]:bg-brand data-[state=active]:text-white">Landing</TabsTrigger>
            <TabsTrigger value="app" className="flex-1 rounded-full data-[state=active]:bg-brand data-[state=active]:text-white">App</TabsTrigger>
            <TabsTrigger value="telegram" className="flex-1 rounded-full data-[state=active]:bg-brand data-[state=active]:text-white">Telegram</TabsTrigger>
          </TabsList>

          <TabsContent value="landing">
            <Card title="Tell about Dook Gold" url={landingUrl} />
          </TabsContent>

          <TabsContent value="app">
            <Card title="Invite to install Dook Gold" url={appUrl} />
          </TabsContent>

          <TabsContent value="telegram">
            <Card title="Share via Telegram" url={landingUrl} shareHref={telegramUrl} />
          </TabsContent>
        </Tabs>
      </div>
    </MobileContainer>
  );
};
