/**
 * Defines the routes for the application.
 */
export const routes = {
  home: "/",
  account: {
    login: "/login",
    register: {
      index: "/register",
      confirmation: "/register/confirmation",
    },
    username: {
      forgot: {
        index: "/forgot-username",
        confirmation: "/forgot-username/confirmation",
      },
    },
    password: {
      forgot: {
        index: "/forgot-password",
        confirmation: "/forgot-password/confirmation",
      },
      reset: {
        index: "/reset-password",
        confirmation: "/reset-password/confirmation",
      },
    },
  },
  pages: {
    index: "/pages",
    page: {
      index: "/pages/:id",
      appearance: "/pages/:id/appearance",
      settings: "/pages/:id/settings",
      links: {
        index: "/pages/:id/links",
        link: "/pages/:id/links/:linkId",
      },
    },
  },
  settings: {
    account: "/settings/account",
    profile: "/settings/profile",
    security: "/settings/security",
    appearance: "/settings/appearance",
    notifications: "/settings/notifications",
    integrations: "/settings/integrations",
    billing: "/settings/billing",
  },
  analytics: {
    index: "/analytics",
  },
  log: {
    index: "/log",
  },
};

export default routes;


