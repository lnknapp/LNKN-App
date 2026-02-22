import { router, routes } from '../../../app/routes';
import { useSpinner } from '../../../hooks';
import { RegisterRequest } from '../../../models';
import { AccountService } from '../../../services';
import { showSuccessMessage } from '../../../utils';

const accountService = new AccountService();

export function useRegistration() {
  const { showSpinner, show, hide } = useSpinner();

  const registerUser = async (request: RegisterRequest) => {
    show();
    try {
      const ok = await accountService.register(request);
      hide();
      if (ok) {
        showSuccessMessage('Account created! Check your email to confirm before logging in.');
        router.navigate(routes.account.login);
      }
    } catch (e: any) {
      hide();
      console.error('Registration failed:', e?.message ?? e);
    }
  };

  const checkUsernameExists = async (username: string) => {
    try {
      return await accountService.checkUsernameExists(username);
    } catch {
      return false;
    }
  };

  const checkEmailExists = async (email: string) => {
    try {
      return await accountService.checkEmailExists(email);
    } catch {
      return false;
    }
  };

  return { registerUser, showSpinner, checkUsernameExists, checkEmailExists };
}
