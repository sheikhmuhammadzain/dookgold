import React, { useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { DookLogo } from '@/components/ui/DookLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

export const CreateAccountScreen: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email]);
  const canContinue = fullName.trim().length >= 2 && emailValid && agree;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canContinue) return;
    try {
      if (fullName) localStorage.setItem('dook-username', fullName);
      if (username) localStorage.setItem('dook-handle', username);
      if (email) localStorage.setItem('dook-email', email);
    } catch {}
    navigate('/setup-pin');
  }

  return (
    <MobileContainer className="bg-background" showStatusBar={false}>
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => navigate('/welcome')}
          className="text-base text-foreground hover:text-brand transition-colors"
        >
          ← Back
        </button>
        <span className="text-sm text-foreground-muted">Create account</span>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center px-4 pb-6">
        {/* Brand */}
        <div className="mt-4 mb-6">
          <DookLogo size="xxl" />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-6 text-center">
          Let’s set up your account
        </h1>

        <div className="w-full max-w-sm space-y-4">
          <div>
            <label className="text-sm text-foreground-muted">Full name</label>
            <Input
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-foreground-muted">Username (optional)</label>
            <Input
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-foreground-muted">Email</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              required
            />
            {!emailValid && email.length > 0 && (
              <div className="text-xs text-red-600 mt-1">Please enter a valid email.</div>
            )}
          </div>

          <label className="flex items-center gap-3 mt-2">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
            <span className="text-sm text-foreground-muted">I agree to the Terms and Privacy Policy</span>
          </label>

          <Button type="submit" className="w-full h-11 mt-2" disabled={!canContinue}>
            Continue
          </Button>
        </div>
      </form>
    </MobileContainer>
  );
};

export default CreateAccountScreen;
