import { AccountService, TokenService } from "../services";
import { router, routes } from "../app/routes";
import { useQueryParams, useSpinner } from '.';
import { store, setToken, setIsLoggedIn, setTokenData, setUserInfo } from "../app";

export function useAuthentication() {
  const { showSpinner, show, hide } = useSpinner();
  const { getQueryParam } = useQueryParams();

  const accountService = new AccountService();

  const loginUser = async (emailOrUsername: string, password: string, rememberMe: boolean) => {
    try {
      show();
      const loginResponse = await accountService.login(emailOrUsername, password, rememberMe);

      if (loginResponse?.success){

        if(!loginResponse?.token) return;
        store.dispatch(setToken(loginResponse.token));

        const tokenData = TokenService.getTokenData(loginResponse.token);

        if (rememberMe) localStorage.setItem('userToken', loginResponse.token);

        const userRoles = loginResponse.user?.roles;

        store.dispatch(setIsLoggedIn(true));
        store.dispatch(setTokenData(tokenData));
        store.dispatch(setUserInfo({
          ...loginResponse.user,
          roles: userRoles
        }));

        const returnUrl = getQueryParam("returnUrl");
        const destination = returnUrl ?? routes.home;
        router.navigate(destination);
      }
    } catch (error) {
      console.error(error);

    } finally {
      hide();
    }
  };

  return { loginUser, showSpinner };
}

export default useAuthentication;
