import { ChangePasswordRequest, ForgotPasswordRequest, LoginResponse, RegisterRequest, RegisterResult, ResetPasswordRequest } from "../../../models";
import { BaseRepository, RepositoryError } from "../BaseRepository";

export class LoginError extends RepositoryError {}
export class RegisterError extends RepositoryError {}
export class ForgotPasswordError extends RepositoryError {}
export class ResetPasswordError extends RepositoryError {}
export class ChangePasswordError extends RepositoryError {}

/**
 * Repository class for handling account-related operations.
 */
export class AccountRepo extends BaseRepository {

  /**
   * Logs in the user with the provided email and password.
   * @param emailOrUsername - The user's email.
   * @param password - The user's password.
   * @param rememberMe - Indicates whether to remember the user's login.
   * @returns A promise that resolves to the login response, or null/undefined if unsuccessful.
   * @throws {LoginError} If an error occurs during the login process.
   */
  async login(emailOrUsername: string, password: string, rememberMe: boolean): Promise<LoginResponse | null | undefined> {
    const url = "account/signin";
    const body = {
      "emailOrUsername": emailOrUsername,
      "password": password,
    };

    try {
      const response = await this.client.post<LoginResponse>(url, body);
      return this.handleResponse<LoginResponse>(response);
    } catch (e: any) {
      throw new LoginError(e?.message, e?.code);
    }
  }

  /**
   * Registers a new user with the provided registration information.
   * @param request - The registration request.
   * @returns A promise that resolves to true if the registration is successful, false otherwise.
   * @throws {RegisterError} If an error occurs during the registration process.
   */
  async register(request: RegisterRequest): Promise<RegisterResult> {
    const url = 'account/register';
    const body = {
      "email": request.email,
      "username": request.username,
      "password": request.password,
      "confirmPassword": request.confirmPassword,
    };

    try {
      const response = await this.client.post(url, body);
      return this.handleResponse(response);
    } catch (e: any) {
      throw new RegisterError(e?.message, e?.code);
    }
  }

  /**
   * Sends a password reset email to the user with the provided email in the request.
   * @param request - The forgot password request.
   * @returns A promise that resolves to true if the password reset email is sent successfully, false otherwise.
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<boolean> {
    const url = 'account/forgotpassword';
    const body = {
      "email": request.email
    };
    try {
      const response = await this.client.post(url, body);
      return this.handleResponse(response);
    }
    catch (e: any) {
      throw new ForgotPasswordError(e?.message, e?.code);
    }
  }

  /**
   * Reset the password of the user.
   * @param request - The reset password request.
   * @returns A promise that resolves to true if the password reset is successful, false otherwise.
   */
  async resetPassword(request: ResetPasswordRequest): Promise<boolean> {
    const url = 'account/resetpassword';
    const body = {
      "email": request.email,
      "password": request.password,
      "confirmPassword": request.confirmPassword,
      "code": request.code
    };
    try {
      const response = await this.client.post(url, body);
      return this.handleResponse(response);
    }
    catch (e: any) {
      throw new ResetPasswordError(e?.message, e?.code);
    }
  }

  /**
   * Change the password of the user.
   * @param request - The change password request.
   * @returns A promise that resolves to true if the password change is successful, false otherwise.
   */
  async changePassword(request: ChangePasswordRequest): Promise<boolean> {
    const url = 'account/changepassword';
    const body = {
      "userId": request.userId,
      "oldPassword": request.oldPassword,
      "newPassword": request.newPassword
    };
    try {
      const response = await this.client.post(url, body);
      return this.handleResponse(response);
    }
    catch (e: any) {
      throw new ChangePasswordError(e?.message, e?.code);
    }
  }
}
