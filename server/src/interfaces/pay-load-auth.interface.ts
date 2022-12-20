import { Jwt, JwtPayload } from "jsonwebtoken";

export interface JwtAuth extends Jwt {
  payload: JwtPayload & {
    username?: string
  }
}