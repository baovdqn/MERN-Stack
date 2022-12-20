import { JwtPayload } from "jsonwebtoken";

export interface IBodyPayload extends JwtPayload {
  username?: string;
}