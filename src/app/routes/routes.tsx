/**
 * Defines the routes for the application.
 */
export const routes = {
  home: "/",
  account: {
    index: "/account",
    login: "/account/login",
    register: {
      index: "/account/register",
      confirmation: "/account/register/confirmation",
    },
    username: {
      forgot: {
        index: "/account/forgot-username",
        confirmation: "/account/forgot-username/confirmation",
      },
    },
    password: {
      forgot: {
        index: "/account/forgotPassword",
        confirmation: "/account/forgotPasswordConfirmation",
      },
      reset: {
        index: "/account/resetPassword",
        confirmation: "/account/resetPasswordConfirmation",
      },
    },
  },
  log: {
    index: "/log",
  },
};

export default routes;


