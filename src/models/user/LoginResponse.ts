import { UserInfo } from "./";

export interface LoginResponse {
  refreshToken: string | null;
  success: boolean;
  token: string | null;
  user: UserInfo | null;
}

export default LoginResponse;
