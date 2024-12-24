import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import AccountService from "../../../services/account/AccountService";
import { ForgotPasswordRequest } from "../../../models";

export function useForgotPassword() {
  const accountService = new AccountService();
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = async (request: ForgotPasswordRequest) => {
    setShowSpinner(true);
    const ok = await accountService.forgotPassword(request);
    setShowSpinner(false);
    if (ok) navigate(routes.account.password.forgot.confirmation);
  };

  return {
    forgotPassword,
    showSpinner
  };
}
