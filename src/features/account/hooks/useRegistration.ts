import { router, routes } from "../../../app/routes";
import { useSpinner } from "../../../hooks";
import { RegisterRequest } from "../../../models";
import { AccountService } from "../../../services";
import { showSuccessMessage } from "../../../utils";

export function useRegistration() {
  const { showSpinner, show, hide } = useSpinner();
  const accountService = new AccountService();

  const registerUser = async (request: RegisterRequest) => {
    show();
    try {
      const ok = await accountService.register(request);
      hide();
      if(ok)

        showSuccessMessage(`Account created successfully!`);
        router.navigate(routes.account.login);
    }
    catch(e) {
      console.error(e);
    }
  }

  const checkUsernameExists = async (username: string) => {
    show();
    try {
      const ok = await accountService.checkUsernameExists(username);
      hide();
      return ok;
    }
    catch(e) {
      console.error(e);
    }
  }

  const checkEmailExists = async (email: string) => {
    show();
    try {
      const ok = await accountService.checkEmailExists(email);
      hide();
      return ok;
    }
    catch(e) {
      console.error(e);
    }
  }

  return {
    registerUser,
    showSpinner,
    checkUsernameExists,
    checkEmailExists
  };

}
