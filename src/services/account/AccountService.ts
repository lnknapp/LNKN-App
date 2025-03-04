import { AccountRepo } from "../../data/repo";
import { ChangePasswordRequest, ForgotPasswordRequest, ForgotUsernameRequest, RegisterRequest, ResetPasswordRequest } from "../../models";
import { UserService } from "../authentication/UserService";
/**
 * Service class for handling account-related operations.
 */
export class AccountService {

  protected repo = new AccountRepo();

  protected userService = new UserService();

  /**
   * Logs in a user with the provided email, password, and rememberMe flag.
   * @param emailOrUsername - The user's email.
   * @param password - The user's password.
   * @param rememberMe - Flag indicating whether to remember the user's login.
   * @returns A promise that resolves to the login response.
   */
  async login(emailOrUsername: string, password: string, rememberMe: boolean) {
    try {
      const response = await this.repo.login(emailOrUsername, password, rememberMe);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * Registers a new user with the registration information.
   * @param request - The registration request.
   * @returns A promise that resolves to the registration response.
   */
  async register(request: RegisterRequest) {
    try {
      const response = await this.repo.register(request);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }

  /**
   * Sends a password reset email to the user with the provided email.
   * @param request - The forgot password request.
   * @returns A promise that resolves to the forgot password response.
   */
  async forgotPassword(request: ForgotPasswordRequest) {
    try {
      const response = await this.repo.forgotPassword(request);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }

  /**
   * Sends a username reminder email to the user with the provided email.
   * @param request - The forgot username request.
   * @returns A promise that resolves to the forgot username response.
   */
  async forgotUsername(request: ForgotUsernameRequest) {
    try {
      const response = await this.repo.forgotUsername(request);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }

  /**
   * Resets the password of the user.
   * @param request - The reset password request.
   * @returns A promise that resolves to the reset password response.
   */
  async resetPassword(request: ResetPasswordRequest) {
    try {
      const response = await this.repo.resetPassword(request);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }

  /**
   * Resets the password of the user.
   * @param request - The reset password request.
   * @returns A promise that resolves to the reset password response.
   */
  async changePassword(request: ChangePasswordRequest) {
    try {
      const response = await this.repo.changePassword(request);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }


  /**
   * Check if a user with the same username exists.
   * @param username - The username to check.
   * @returns boolean if the username exists.
   */
  async checkUsernameExists(username: string) {
    try {
      const response = await this.repo.checkUsernameExists(username);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }

  /**
   * Check if a user with the same email exists.
   * @param email - The email to check.
   * @returns boolean if the email exists.
   */
  async checkEmailExists(email: string) {
    try {
      const response = await this.repo.checkEmailExists(email);
      return response;
    }
    catch(error) {
      console.error(error);
    }
  }

}

export default AccountService;
