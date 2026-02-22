import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../app/routes';
import AccountService from '../../../services/account/AccountService';

const accountService = new AccountService();

export function useForgotPassword() {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = async (request: { email: string }) => {
    setShowSpinner(true);
    try {
      const ok = await accountService.forgotPassword(request.email);
      if (ok) navigate(routes.account.password.forgot.confirmation);
    } catch (e: any) {
      console.error('Forgot password failed:', e?.message ?? e);
    } finally {
      setShowSpinner(false);
    }
  };

  return { forgotPassword, showSpinner };
}
