import { createBrowserRouter, Outlet } from "react-router-dom";
import Root from "../../root";
import * as Features from "../../features";
import { Role } from "../../models";

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
      //Pages
      {
        path: "pages",
        element: (
          <Outlet />
        ),
        children: [
          {
            path: "",
            element: <Features.PagesIndexLayout />,
            children: [
              {
                path: "",
                element: <Features.PagesIndexPage />,
              },
              {
                path: ":id",
                element: <Features.PageLayout />,
                children: [
                  {
                    path: "",
                    element: <Features.PageDetailsPage />,
                  }
                ]
              }
            ]
          }
        ]
      },
      // Analytics
      {
        path: "analytics",
        element: (
          <Features.SecurityOutlet
            roles={[
              Role.administrator
            ]}
          >
            <Outlet />
          </Features.SecurityOutlet>
        ),
        children: [
          {
            path: "",
            element: <Features.AnalyticsLayout />,
            children: [
              {
                path: "",
                element: <Features.AnalyticsIndexPage />,
              }
            ]
          }
        ]
      },
      // Settings
      {
        path: "",
        element: (
          <Features.SettingsLayout />
        ),
        children: [
          {
            path: "settings/account",
            element: <Features.AccountSettingsPage />,
          },
          {
            path: "settings/profile",
            element: <Features.ProfileSettingsPage />,
          },
          {
            path: "settings/security",
            element: <Features.SecuritySettingsPage />,
          },
          {
            path: "settings/appearance",
            element: <Features.AppearanceSettingsPage />,
          },
          {
            path: "settings/notifications",
            element: <Features.NotificationsSettingsPage />,
          },
          {
            path: "settings/billing",
            element: <Features.BillingSettingsPage />,
          },
          {
            path: "settings/integrations",
            element: <Features.IntegrationsSettingsPage />,
          }
        ]
      }
    ],
  },
  //Account
  {
    path: "",
    element: <Features.AccountPageLayout />,
    errorElement: <Features.ErrorPage />,
    children: [
      {
        path: "login",
        element: <Features.LoginPage />,
      },
      {
        path: "register",
        element: <Features.RegisterPage />,
      },
      {
        path: `login?returnUrl=:returnUrl`,
        element: <Features.LoginPage />,
      },
      {
        path: "forgot-password",
        element: <Features.ForgotPasswordPage />,
      },
      {
        path: "forgot-password/confirmation",
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
        path: "reset-password",
        element: <Features.ResetPasswordPage />,
      },
      {
        path: "reset-password/confirmation",
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
