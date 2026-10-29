import React from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SendSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation() as { state?: any };
  const symbol = params.symbol || state?.symbol || 'ASSET';
  const amount = state?.amount ?? 0;
  const recipient = state?.recipient || '—';
  const network = state?.network || '—';

  return (
    <MobileContainer className="bg-background pb-20">
      {/* Header */}
      <div className="bg-brand px-2 py-2">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/wallets')} aria-label="Back" className="p-1">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">Success</h1>
          <div className="w-6 h-6" />
        </div>
      </div>

      <div className="p-6 flex flex-col items-center text-center gap-4">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <div className="text-xl font-semibold">Successfully Sent</div>
        <div className="text-sm text-foreground-muted">
          You sent <span className="font-medium text-foreground">{amount} {symbol}</span> on <span className="font-medium">{network}</span>.
        </div>
        <div className="w-full rounded-xl border border-card-border bg-card p-3 text-left text-sm">
          <div className="flex justify-between py-1">
            <span className="text-foreground-muted">To</span>
            <span className="font-medium truncate max-w-[60%] text-right">{recipient}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-foreground-muted">Amount</span>
            <span className="font-medium">{amount} {symbol}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-foreground-muted">Network</span>
            <span className="font-medium">{network}</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-3 mt-2">
          <Button variant="secondary" className="h-11" onClick={() => navigate(`/send/${symbol}`)}>
            Send again
          </Button>
          <Button className="h-11" onClick={() => navigate('/wallets')}>
            Done
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default SendSuccessScreen;
