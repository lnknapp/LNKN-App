export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export default ResetPasswordRequest;
