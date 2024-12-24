import { createBrowserRouter } from "react-router-dom";
import Root from "../../root";
import * as Features from "../../features";

/**
 * The base router configuration for the application.
 * It defines the routes and their corresponding components.
 */
const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: <Features.NotFound />,
  },
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Features.ErrorPage />,
    children: [
      // Empty path
      {
        path: "",
        element: <Features.HomePage />,
      },
    ],
  },
  //Account
  {
    path: "account",
    element: <Features.AccountPageLayout />,
    errorElement: <Features.ErrorPage />,
    children: [
      {
        path: "",
        element: <Features.LoginPage />,
      },
      {
        path: "register",
        element: <Features.RegisterPage />,
      },
      {
        path: "login",
        element: <Features.LoginPage />,
      },
      {
        path: `login?returnUrl=:returnUrl`,
        element: <Features.LoginPage />,
      },
      {
        path: "forgotPassword",
        element: <Features.ForgotPasswordPage />,
      },
      {
        path: "forgotPasswordConfirmation",
        element: <Features.ForgotPasswordConfirmationPage />,
      },
      {
        path: "forgot-username",
        element: <Features.ForgotUsernamePage />,
      },
      {
        path: "forgot-username/confirmation",
        element: <Features.ForgotUsernameConfirmationPage />,
      },
      {
        path: "resetPassword",
        element: <Features.ResetPasswordPage />,
      },
      {
        path: "resetPasswordConfirmation",
        element: <Features.ResetPasswordConfirmationPage />,
      },
    ],
  },
]);

/**
 * The router object that extends the baseRouter and provides additional functionality.
 */
export const router = Object.assign(browserRouter, {
  /**
   * Gets the URL with the specified parameters replaced.
   * @param url - The URL to process.
   * @param params - The parameters to replace in the URL.
   * @returns The processed URL.
   */
  getUrl: (url: string, params: Map<string, string> | undefined) => {
    let lowerUrl = url.toLocaleLowerCase();
    let replacedUrl: string = lowerUrl;
    params?.forEach((value, key) => {
      replacedUrl = lowerUrl.replace(`:${key.toLocaleLowerCase()}`, value);
      lowerUrl = replacedUrl;
    });
    return lowerUrl;
  },
  /**
   * Navigates to the specified URL with the specified parameters.
   * @param url - The URL to navigate to.
   * @param params - The parameters to replace in the URL.
   * @param newTab - A boolean indicating whether to open the URL in a new tab.
   */
  navigateWithParams: (
    url: string,
    params: Map<string, string> | undefined,
    newTab: boolean = false
  ) => {
    const processedUrl = router.getUrl(url, params);
    if (newTab) {
      window.open(processedUrl, "_blank");
      return;
    }
    browserRouter.navigate(processedUrl).catch((error) => {
      return <Features.ErrorPage />;
    });
  },
});

export default router;
