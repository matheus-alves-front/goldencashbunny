import { JWTAccountType } from "@/@types/globalTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function useAccountJWT(): Promise<JWTAccountType | null> {
  const cookie = cookies()
  const xgoldentoken = cookie.get('xgoldentoken')
  const token = xgoldentoken?.value

  if (token) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'object' && decoded && 'id' in decoded) {
      return decoded as unknown as JWTAccountType;
    } else {
      throw new Error("Token is not valid for JWTAccountType");
    }
  } else {
    return null;
  }
}