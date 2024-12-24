import jwt_decode from 'jwt-decode';
import { TokenData } from '../../models';
import { store } from '../../app/store/';

interface ApiPayload {
  primarysid: string;
  name: string;// returns the email
  role: string;
  aud: string[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
}

export class TokenService {

  static getTokenData(token: string): TokenData {
    const decoded = jwt_decode<ApiPayload>(token);
    const id = Number.parseInt(decoded.primarysid);
    const notBefore = new Date(decoded.nbf * 1000);
    const expires = new Date(decoded.exp * 1000);
    const issuedAt = new Date(decoded.iat * 1000);

    return {
      userId: id,
      email: decoded.name,
      audience: decoded.aud,
      notBefore: notBefore.toISOString(),
      expires: expires.toISOString(),
      issuedAt: issuedAt.toISOString(),
      issuer: decoded.iss
    };
  }

  static isTokenExpired(): boolean {
    const tokenData = store.getState().authentication.tokenData;
    if (!tokenData) return true;
    const expires = new Date(tokenData.expires);
    const now = new Date();
    return expires < now;
  }


}

export default TokenService;
