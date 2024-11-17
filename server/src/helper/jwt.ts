import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const secret = process.env.SECRET as string;

export interface TokenType {
  userId: string;
  // email: string;
  isAdmin : boolean
}

export function sign(payload: TokenType) {
  return jwt.sign(payload, secret);
}

export function verify(token: string): TokenType | null {
  try {
    return jwt.verify(token, secret) as TokenType;
  } catch (error) {
    console.error("Token Verification Failed", error);
    return null;
  }
}
