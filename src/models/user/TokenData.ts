export interface TokenData {
  userId: number;
  email: string;
  audience: string[];
  notBefore: string;
  expires: string;
  issuedAt: string;
  issuer: string;
}

export default TokenData;
