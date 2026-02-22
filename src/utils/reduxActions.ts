import { router, routes } from '../app/routes';
import { store, clearToken, clearTokenData, clearUserInfo, setIsLoggedIn, setError, setSuccess, setWarning, setInformation } from '../app/store';
import { supabase } from '../lib/supabase';

export async function forceLogout() {
  await supabase.auth.signOut();
  store.dispatch(clearToken());
  store.dispatch(clearTokenData());
  store.dispatch(clearUserInfo());
  store.dispatch(setIsLoggedIn(false));
  localStorage.removeItem('userToken');
  router.navigate(routes.account.login);
}

export function showErrorMessage(message: string) {
  store.dispatch(setError(message));
}

export function showSuccessMessage(message: string) {
  store.dispatch(setSuccess(message));
}

export function showWarningMessage(message: string) {
  store.dispatch(setWarning(message));
}

export function showInfoMessage(message: string) {
  store.dispatch(setInformation(message));
}
