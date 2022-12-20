import { NextFunction, Response } from "express";
import { Jwt, verify } from "jsonwebtoken";
import { JwtAuth } from "../interfaces/pay-load-auth.interface";
import { IRequestLogin } from "../interfaces/request-auth.interface";
import { User } from "../models/userModel";

const verifyToken = async (token: string, secretKey: string): Promise<Jwt | undefined> => {
  try {
    return await verify(token, secretKey, { complete: true });
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
  }
};

export const authMiddleWare = async (req: IRequestLogin, res: Response, next: NextFunction) => {
  const regex = /(Bearer)\s+/g
  const accessTokenFromHeader = req.headers.authorization?.replace(regex, '') as string;
  if (!accessTokenFromHeader) {
    return res.status(401).send('Không tìm thấy access token!');
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

  const verified = await verifyToken(
    accessTokenFromHeader,
    accessTokenSecret,
  ) as JwtAuth;
  if (!verified) {
    return res
      .status(401)
      .send('Bạn không có quyền truy cập vào tính năng này!');
  }

  const user = await User.findOne({ username: verified.payload.username });
  req.user = user;

  return next();
}