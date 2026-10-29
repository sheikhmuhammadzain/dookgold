import React, { useEffect, useMemo, useState } from 'react';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ChevronLeft, Bell, Settings, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useI18n } from '@/contexts/I18nContext';

// simple persistence helper
const readBool = (key: string, fallback = false) => {
  const v = localStorage.getItem(key);
  return v === null ? fallback : v === 'true';
};
const writeBool = (key: string, v: boolean) => localStorage.setItem(key, String(v));

export const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  // Master toggles
  const [allowAll, setAllowAll] = useState<boolean>(true);
  const [telegram, setTelegram] = useState<boolean>(false);

  // Authentication
  const [authSuccess, setAuthSuccess] = useState(true);
  const [authNewIp, setAuthNewIp] = useState(true);
  const [auth2faEnabled, setAuth2faEnabled] = useState(true);
  const [auth2faDisabled, setAuth2faDisabled] = useState(true);
  const [auth2faModified, setAuth2faModified] = useState(true);

  // Transactions
  const [txDeposit, setTxDeposit] = useState(true);
  const [txWithdrawReq, setTxWithdrawReq] = useState(true);
  const [txWithdrawDone, setTxWithdrawDone] = useState(true);
  const [txExchangeDone, setTxExchangeDone] = useState(false);

  // Settings
  const [stLimit, setStLimit] = useState(true);
  const [stAllowedIp, setStAllowedIp] = useState(false);
  const [stBlockedIp, setStBlockedIp] = useState(false);

  // Load
  useEffect(() => {
    setAllowAll(readBool('notif-allow', true));
    setTelegram(readBool('notif-telegram', false));

    setAuthSuccess(readBool('notif-auth-success', true));
    setAuthNewIp(readBool('notif-auth-newip', true));
    setAuth2faEnabled(readBool('notif-auth-2fa-enabled', true));
    setAuth2faDisabled(readBool('notif-auth-2fa-disabled', true));
    setAuth2faModified(readBool('notif-auth-2fa-modified', true));

    setTxDeposit(readBool('notif-tx-deposit', true));
    setTxWithdrawReq(readBool('notif-tx-withdraw-req', true));
    setTxWithdrawDone(readBool('notif-tx-withdraw-done', true));
    setTxExchangeDone(readBool('notif-tx-exchange-done', false));

    setStLimit(readBool('notif-st-limit', true));
    setStAllowedIp(readBool('notif-st-allowed-ip', false));
    setStBlockedIp(readBool('notif-st-blocked-ip', false));
  }, []);

  // Persist
  useEffect(() => { writeBool('notif-allow', allowAll); }, [allowAll]);
  useEffect(() => { writeBool('notif-telegram', telegram); }, [telegram]);

  useEffect(() => { writeBool('notif-auth-success', authSuccess); }, [authSuccess]);
  useEffect(() => { writeBool('notif-auth-newip', authNewIp); }, [authNewIp]);
  useEffect(() => { writeBool('notif-auth-2fa-enabled', auth2faEnabled); }, [auth2faEnabled]);
  useEffect(() => { writeBool('notif-auth-2fa-disabled', auth2faDisabled); }, [auth2faDisabled]);
  useEffect(() => { writeBool('notif-auth-2fa-modified', auth2faModified); }, [auth2faModified]);

  useEffect(() => { writeBool('notif-tx-deposit', txDeposit); }, [txDeposit]);
  useEffect(() => { writeBool('notif-tx-withdraw-req', txWithdrawReq); }, [txWithdrawReq]);
  useEffect(() => { writeBool('notif-tx-withdraw-done', txWithdrawDone); }, [txWithdrawDone]);
  useEffect(() => { writeBool('notif-tx-exchange-done', txExchangeDone); }, [txExchangeDone]);

  useEffect(() => { writeBool('notif-st-limit', stLimit); }, [stLimit]);
  useEffect(() => { writeBool('notif-st-allowed-ip', stAllowedIp); }, [stAllowedIp]);
  useEffect(() => { writeBool('notif-st-blocked-ip', stBlockedIp); }, [stBlockedIp]);

  const disabled = useMemo(() => !allowAll, [allowAll]);

  const Row: React.FC<{ label: string; value: boolean; onChange: (v:boolean)=>void; info?: boolean }>
    = ({ label, value, onChange, info }) => (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0 border-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-foreground">{label}</span>
        {info && <Info className="w-4 h-4 text-foreground-muted" />}
      </div>
      <Switch checked={value} onCheckedChange={onChange} disabled={disabled} />
    </div>
  );

  const Section: React.FC<{ title: string; rightToggle?: React.ReactNode; children: React.ReactNode }>
    = ({ title, rightToggle, children }) => (
    <div className="px-4">
      <div className="flex items-center justify-between bg-brand/10 text-foreground rounded-t-xl px-4 py-3">
        <span className="font-semibold">{title}</span>
        {rightToggle}
      </div>
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 overflow-hidden">
        {children}
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
          <div className="flex items-center justify-center gap-2">
            <Bell className="w-5 h-5 text-brand" />
            <h1 className="text-lg font-semibold text-foreground">{t('notifications')}</h1>
          </div>
        </div>
        <Link to="/notifications/history" title={t('history')} className="p-1 rounded-md hover:bg-gray-100">
          <Settings className="w-5 h-5 text-foreground" />
        </Link>
      </div>

      <div className="flex-1 space-y-6 py-4">
        {/* Allow notifications */}
        <Section title={t('allow_notifications_title')} rightToggle={<Switch checked={allowAll} onCheckedChange={setAllowAll} />}>
          <div className="p-4 text-sm text-foreground-muted">{t('allow_notifications_desc')}</div>
        </Section>

        {/* Telegram Notifications */}
        <Section title={t('telegram_notifications_title')} rightToggle={<Switch checked={telegram} onCheckedChange={setTelegram} disabled={disabled} />}>
          <div className="p-4 text-sm text-foreground-muted">{t('telegram_notifications_desc')}</div>
        </Section>

        {/* Authentication */}
        <Section title={t('authentication')}>
          <Row label={t('successful_sign_in')} value={authSuccess} onChange={setAuthSuccess} />
          <Row label={t('new_sign_in_ip')} value={authNewIp} onChange={setAuthNewIp} />
          <Row label={t('twofa_enabled')} value={auth2faEnabled} onChange={setAuth2faEnabled} info />
          <Row label={t('twofa_disabled')} value={auth2faDisabled} onChange={setAuth2faDisabled} info />
          <Row label={t('twofa_modified')} value={auth2faModified} onChange={setAuth2faModified} info />
        </Section>

        {/* Transactions */}
        <Section title={t('transactions')}>
          <Row label={t('wallet_deposit')} value={txDeposit} onChange={setTxDeposit} />
          <Row label={t('withdrawal_request')} value={txWithdrawReq} onChange={setTxWithdrawReq} />
          <Row label={t('withdrawal_completed')} value={txWithdrawDone} onChange={setTxWithdrawDone} />
          <Row label={t('exchange_completed')} value={txExchangeDone} onChange={setTxExchangeDone} />
        </Section>

        {/* Settings */}
        <Section title={t('settings')}>
          <Row label={t('transaction_limit')} value={stLimit} onChange={setStLimit} />
          <Row label={t('allowed_ips')} value={stAllowedIp} onChange={setStAllowedIp} />
          <Row label={t('blocked_ips')} value={stBlockedIp} onChange={setStBlockedIp} />
        </Section>
      </div>
    </MobileContainer>
  );
};
