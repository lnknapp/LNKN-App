import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import AccountService from "../../../services/account/AccountService";
import { ForgotUsernameRequest } from "../../../models";

export function useForgotUsername() {
  const accountService = new AccountService();
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const forgotUsername = async (request: ForgotUsernameRequest) => {
    setShowSpinner(true);
    const ok = await accountService.forgotUsername(request);
    setShowSpinner(false);
    if (ok) navigate(routes.account.username.forgot.confirmation);
  };

  return {
    forgotUsername,
    showSpinner
  };
}
