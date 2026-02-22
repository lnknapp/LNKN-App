import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../app/routes';
import AccountService from '../../../services/account/AccountService';

const accountService = new AccountService();

export function useResetPassword() {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  // Supabase handles the token via the URL hash automatically;
  // we just need the new password.
  const resetPassword = async (request: { password: string }) => {
    setShowSpinner(true);
    try {
      const ok = await accountService.resetPassword(request.password);
      if (ok) navigate(routes.account.password.reset.confirmation);
    } catch (e: any) {
      console.error('Reset password failed:', e?.message ?? e);
    } finally {
      setShowSpinner(false);
    }
  };

  return { resetPassword, showSpinner };
}
