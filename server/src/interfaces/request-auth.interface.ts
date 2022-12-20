import { Request } from "express";

export interface IRequestLogin extends Request {
  user?: {
    username: string;
    date: Date;
    email: string;
    password: string;
    refreshToken?: string | undefined;
  } | null;
}