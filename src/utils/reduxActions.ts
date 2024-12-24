import { router, routes } from "../app/routes";
import { store, clearToken, clearTokenData, clearUserInfo, setIsLoggedIn, setError, setSuccess, setWarning, setInformation } from "../app/store";

/**
 * Logs out the user by clearing token, token data, logged user, and setting isLoggedIn to false.
 * Removes the user token from local storage and navigates to the login page.
 */
export function forceLogout() {
  store.dispatch(clearToken());
  store.dispatch(clearTokenData());
  store.dispatch(clearUserInfo());
  store.dispatch(setIsLoggedIn(false));
  localStorage.removeItem('userToken');

  router.navigate(routes.account.login);
}

/**
 * Displays an error message by dispatching an action to set the error state.
 * @param message - The error message to display.
 */
export function showErrorMessage(message: string) {
  store.dispatch(setError(message));
}

/**
 * Displays a success message by dispatching a Redux action.
 * @param message - The success message to be displayed.
 */
export function showSuccessMessage(message: string) {
  store.dispatch(setSuccess(message));
}

/**
 * Displays a warning message by dispatching a Redux action.
 * @param message - The warning message to be displayed.
 */
export function showWarningMessage(message: string) {
  store.dispatch(setWarning(message));
}

/**
 * Displays an information message using the Redux store.
 * @param message - The message to be displayed.
 */
export function showInfoMessage(message: string) {
  store.dispatch(setInformation(message));
}
