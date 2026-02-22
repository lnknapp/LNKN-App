import { AccountService } from '../services';
import { router, routes } from '../app/routes';
import { useQueryParams, useSpinner } from '.';
import { store, setToken, setIsLoggedIn, setUserInfo } from '../app';

const accountService = new AccountService();

export function useAuthentication() {
  const { showSpinner, show, hide } = useSpinner();
  const { getQueryParam } = useQueryParams();

  const loginUser = async (emailOrUsername: string, password: string, _rememberMe: boolean) => {
    try {
      show();
      const result = await accountService.login(emailOrUsername, password);
      if (!result) return;

      store.dispatch(setToken(result.token));
      store.dispatch(setIsLoggedIn(true));
      store.dispatch(setUserInfo({ id: result.userId, userName: result.username, roles: [] }));

      const returnUrl = getQueryParam('returnUrl');
      router.navigate(returnUrl ?? routes.home);
    } catch (error: any) {
      console.error('Login failed:', error?.message ?? error);
    } finally {
      hide();
    }
  };

  return { loginUser, showSpinner };
}

export default useAuthentication;
