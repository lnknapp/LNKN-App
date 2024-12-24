import { router, routes } from "../../../app/routes";
import { useSpinner } from "../../../hooks";
import { RegisterRequest } from "../../../models";
import { AccountService } from "../../../services";

export function useRegistration() {
  const { showSpinner, show, hide } = useSpinner();
  const accountService = new AccountService();

  const registerUser = async (request: RegisterRequest) => {
    show();
    try {
      const ok = await accountService.register(request);
      hide();
      if(ok)
        router.navigate(routes.account.register.confirmation);
    }
    catch(e) {
      console.error(e);
    }
  }

  return { registerUser, showSpinner };

}
