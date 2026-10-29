import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { setToken as persistToken } from "@/api/client";
import { SplashScreen } from "./pages/SplashScreen";
import { PinScreen } from "./pages/PinScreen";
import { WalletsScreen } from "./pages/WalletsScreen";
import { BalanceScreen } from "./pages/BalanceScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { ProfileDetailsScreen } from "./pages/ProfileDetailsScreen";
import { ChangeBaseCurrencyScreen } from "./pages/ChangeBaseCurrencyScreen";
import { ChangeUsernameScreen } from "./pages/ChangeUsernameScreen";
import { SecurityScreen } from "./pages/SecurityScreen";
import { BiometricsScreen } from "./pages/BiometricsScreen";
import { TwoFATelegramScreen } from "./pages/TwoFATelegramScreen";
import { TwoFAAuthenticatorScreen } from "./pages/TwoFAAuthenticatorScreen";
import { Enter2FACodeScreen } from "./pages/Enter2FACodeScreen";
import { AllowedIPsScreen } from "./pages/AllowedIPsScreen";
import { AddAllowedIPScreen } from "./pages/AddAllowedIPScreen";
import { BlockedIPsScreen } from "./pages/BlockedIPsScreen";
import { AddBlockedIPScreen } from "./pages/AddBlockedIPScreen";
import { SessionsScreen } from "./pages/SessionsScreen";
import { LimitsScreen } from "./pages/LimitsScreen";
import { NotificationsScreen } from "./pages/NotificationsScreen";
import { NotificationHistoryScreen } from "./pages/NotificationHistoryScreen";
import { AffiliateProgramScreen } from "./pages/AffiliateProgramScreen";
import { HistoryScreen } from "./pages/HistoryScreen";
import { DepositScreen } from "./pages/DepositScreen";
import { ExchangeScreen } from "./pages/ExchangeScreen";
import { SendScreen } from "./pages/SendScreen";
import { SendAssetScreen } from "./pages/SendAssetScreen";
import { SendSuccessScreen } from "./pages/SendSuccessScreen";
import { CurrenciesScreen } from "./pages/CurrenciesScreen";
import NotFound from "./pages/NotFound";
import { MarketPriceScreen } from "./pages/MarketPriceScreen";
import { AppQRScreen } from "./pages/AppQRScreen";
import ExchangeFormScreen from "./pages/ExchangeFormScreen";
import OtpConfirmScreen from "./pages/OtpConfirmScreen";
import { AssetDepositScreen } from "./pages/AssetDepositScreen";
import { PayMeLinkScreen } from "./pages/PayMeLinkScreen";
import { PayMeCheckoutScreen } from "./pages/PayMeCheckoutScreen";
import { AddCoinScreen } from "./pages/AddCoinScreen";
import { ManageCoinsScreen } from "./pages/ManageCoinsScreen";
import { WelcomeAuthScreen } from "./pages/WelcomeAuthScreen";
import { SetupPinScreen } from "./pages/SetupPinScreen";
import { SignInOptionsScreen } from "./pages/SignInOptionsScreen";
import { SignUpOptionsScreen } from "./pages/SignUpOptionsScreen";
import { ChangeBaseFiatCurrencyScreen } from "./pages/ChangeBaseFiatCurrencyScreen";
import { PasskeysScreen } from "./pages/PasskeysScreen";
import SetCoinLimitScreen from "./pages/SetCoinLimitScreen";
import { ThemeScreen } from "./pages/ThemeScreen";
import { HelpScreen } from "./pages/HelpScreen";
import { LanguageScreen } from "./pages/LanguageScreen";
import { I18nProvider } from "./contexts/I18nContext";
import ChangeEmailScreen from "./pages/ChangeEmailScreen";
import VerifyIdentityScreen from "./pages/VerifyIdentityScreen";

const queryClient = new QueryClient();

// Capture JWT from OAuth redirects: ?token=... or ?jwt=...
(() => {
  try {
    const url = new URL(window.location.href);
    const possible = url.searchParams.get('token') || url.searchParams.get('jwt');
    if (possible) {
      persistToken(possible);
      // Clean URL without query params
      url.searchParams.delete('token');
      url.searchParams.delete('jwt');
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  } catch {}
})();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
              {/* Public shareable pay link: opens QR checkout without auth */}
            <Route path="/pay/:linkName" element={<PayMeCheckoutScreen />} />
            <Route path="/" element={<SplashScreen />} />
            <Route path="/welcome" element={<WelcomeAuthScreen />} />
            <Route path="/welcome/signin" element={<SignInOptionsScreen />} />
            <Route path="/welcome/signup" element={<SignUpOptionsScreen />} />
            <Route path="/setup-pin" element={<SetupPinScreen />} />
            <Route path="/pin" element={<PinScreen />} />
            <Route path="/wallets" element={<ProtectedRoute><WalletsScreen /></ProtectedRoute>} />
            <Route path="/balance" element={<ProtectedRoute><BalanceScreen /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
            <Route path="/security" element={<ProtectedRoute><SecurityScreen /></ProtectedRoute>} />
            <Route path="/security/2fa-authenticator" element={<ProtectedRoute><TwoFAAuthenticatorScreen /></ProtectedRoute>} />
            <Route path="/security/2fa-telegram" element={<ProtectedRoute><TwoFATelegramScreen /></ProtectedRoute>} />
            <Route path="/security/2fa-enter-code" element={<ProtectedRoute><Enter2FACodeScreen /></ProtectedRoute>} />
            <Route path="/security/ips/allowed" element={<ProtectedRoute><AllowedIPsScreen /></ProtectedRoute>} />
            <Route path="/security/ips/allowed/add" element={<ProtectedRoute><AddAllowedIPScreen /></ProtectedRoute>} />
            <Route path="/security/ips/blocked" element={<ProtectedRoute><BlockedIPsScreen /></ProtectedRoute>} />
            <Route path="/security/ips/blocked/add" element={<ProtectedRoute><AddBlockedIPScreen /></ProtectedRoute>} />
            <Route path="/security/sessions" element={<ProtectedRoute><SessionsScreen /></ProtectedRoute>} />
            <Route path="/limits" element={<ProtectedRoute><LimitsScreen /></ProtectedRoute>} />
            <Route path="/limits/btc" element={<ProtectedRoute><SetCoinLimitScreen /></ProtectedRoute>} />
            <Route path="/limits/:symbol" element={<ProtectedRoute><SetCoinLimitScreen /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
            <Route path="/notifications/history" element={<ProtectedRoute><NotificationHistoryScreen /></ProtectedRoute>} />
            <Route path="/qr" element={<ProtectedRoute><AppQRScreen /></ProtectedRoute>} />
            <Route path="/affiliate" element={<ProtectedRoute><AffiliateProgramScreen /></ProtectedRoute>} />
            <Route path="/security/biometrics" element={<ProtectedRoute><BiometricsScreen /></ProtectedRoute>} />
            <Route path="/security/passkeys" element={<ProtectedRoute><PasskeysScreen /></ProtectedRoute>} />
            <Route path="/theme" element={<ProtectedRoute><ThemeScreen /></ProtectedRoute>} />
            <Route path="/language" element={<ProtectedRoute><LanguageScreen /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpScreen /></ProtectedRoute>} />
            <Route path="/profile/details" element={<ProtectedRoute><ProfileDetailsScreen /></ProtectedRoute>} />
            <Route path="/profile/change-username" element={<ProtectedRoute><ChangeUsernameScreen /></ProtectedRoute>} />
            <Route path="/profile/change-currency" element={<ProtectedRoute><ChangeBaseCurrencyScreen /></ProtectedRoute>} />
            <Route path="/profile/change-fiat" element={<ProtectedRoute><ChangeBaseFiatCurrencyScreen /></ProtectedRoute>} />
            <Route path="/profile/change-email" element={<ProtectedRoute><ChangeEmailScreen /></ProtectedRoute>} />
            <Route path="/profile/verify-identity" element={<ProtectedRoute><VerifyIdentityScreen /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryScreen /></ProtectedRoute>} />
            <Route path="/deposit" element={<ProtectedRoute><DepositScreen /></ProtectedRoute>} />
            <Route path="/deposit/:symbol" element={<ProtectedRoute><AssetDepositScreen /></ProtectedRoute>} />
            <Route path="/payme/:symbol" element={<ProtectedRoute><PayMeLinkScreen /></ProtectedRoute>} />
            <Route path="/payme/checkout/:symbol" element={<ProtectedRoute><PayMeCheckoutScreen /></ProtectedRoute>} />
            <Route path="/exchange" element={<ProtectedRoute><ExchangeScreen /></ProtectedRoute>} />
            <Route path="/exchange/new" element={<ProtectedRoute><ExchangeFormScreen /></ProtectedRoute>} />
            <Route path="/confirm/otp" element={<ProtectedRoute><OtpConfirmScreen /></ProtectedRoute>} />
            <Route path="/send" element={<ProtectedRoute><SendScreen /></ProtectedRoute>} />
            <Route path="/send/:symbol" element={<ProtectedRoute><SendAssetScreen /></ProtectedRoute>} />
            <Route path="/send/:symbol/success" element={<ProtectedRoute><SendSuccessScreen /></ProtectedRoute>} />
            <Route path="/market/:symbol" element={<ProtectedRoute><MarketPriceScreen /></ProtectedRoute>} />
            <Route path="/coins/add" element={<ProtectedRoute><AddCoinScreen /></ProtectedRoute>} />
            <Route path="/coins/manage" element={<ProtectedRoute><ManageCoinsScreen /></ProtectedRoute>} />
            <Route path="/currencies" element={<ProtectedRoute><CurrenciesScreen /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </I18nProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
