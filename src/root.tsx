import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { router, routes } from "./app/routes";
import AppLayout from "./features/AppLayout";
import UserService from "./services/authentication/UserService";
import { useUrlParams } from "./hooks";

export default function Root() {
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const loginOk = UserService.isSignedIn();
    if (!loginOk) {
      router.navigate(`${routes.account.login}?returnUrl=${location.pathname}`);
      setIsSignedIn(false);
    }

    setIsSignedIn(loginOk);

    return () => {};
  }, [location.pathname]);

  if (!isSignedIn) {
    return <Outlet />;
  }

  return <AppLayout></AppLayout>;
}

