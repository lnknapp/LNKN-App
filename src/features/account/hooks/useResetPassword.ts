import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import AccountService from "../../../services/account/AccountService";
import { ResetPasswordRequest } from "../../../models";

export function useResetPassword() {
  const accountService = new AccountService();
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (request: ResetPasswordRequest) => {
    setShowSpinner(true);
    const ok = await accountService.resetPassword(request);
    setShowSpinner(false);
    if (ok) navigate(routes.account.password.reset.confirmation);
  };

  return {
    resetPassword,
    showSpinner
  };
}
