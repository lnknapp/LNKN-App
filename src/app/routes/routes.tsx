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
      links: {
        index: "/pages/:id/links",
        link: "/pages/:id/links/:linkId",
      },
    },
  },
  log: {
    index: "/log",
  },
};

export default routes;


