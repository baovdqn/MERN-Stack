import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const verifyToken = async (token: any, secretKey: any) => {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  const accessTokenFromHeader = req.headers.x_authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send('Không tìm thấy access token!');
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified = await verifyToken(
    accessTokenFromHeader,
    accessTokenSecret,
  );
  if (!verified) {
    return res
      .status(401)
      .send('Bạn không có quyền truy cập vào tính năng này!');
  }

  const user = await userModle.getUser(verified.payload.username);
  req.user = user;

  return next();
}