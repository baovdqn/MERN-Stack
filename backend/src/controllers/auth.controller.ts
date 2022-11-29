import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt, { Jwt } from 'jsonwebtoken';
import randToken from 'rand-token';

const generateToken = async (payLoad: any, secretSignature: any) => {
  try {
    return await jwt.sign(
      payLoad,
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: '15m',
      }
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};

const decodeToken = async (accessTokenFromHeader: string, accessTokenSecret: string): Promise<Jwt | null> => {
  // try {

  // } catch (error) {
  //   console.log(`Error in decodeToken: ${error}`)
  //   return null;
  // }
  return await null
};

const postSignIn = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Mật khẩu không chính xác.');
  }

  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const dataForAccessToken = {
    user: user.username
  }

  const accessToken = await generateToken(dataForAccessToken, accessTokenSecret);
  if (!accessToken) {
    return res.status(401).send('Đăng nhập không thành công, vui lòng thử lại.');
  }

  let refreshToken = randToken.generate(16); // tạo 1 refresh token ngẫu nhiên
  if (!user.refreshToken) {
    // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
    await User.findOneAndUpdate({ username: username }, { refreshToken: refreshToken });
  } else {
    // Nếu user này đã có refresh token thì lấy refresh token đó từ database
    refreshToken = user.refreshToken;
  }

  return res.json({
    msg: 'Đăng nhập thành công.',
    accessToken,
  });
};

const postSignUp = async (req: Request, res: Response) => {
  const username = req.body.username.toLowerCase();
  const user = await User.findOne({ username: username });
  if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
  else {
    const hashPassword = bcrypt.hashSync(req.body.password, 1);
    const newUser = {
      username: username,
      password: hashPassword,
      email: req.body.email,
    };
    const createUser = await User.create(newUser);
    if (!createUser) {
      return res.status(400).send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
    }
    return res.send({
      username,
    });
  }
};

const postRefreshToken = async (req: Request, res: Response) => {
  // Lấy access token từ header
  const regex = /(Bearer)\s+/g
  const accessTokenFromHeader = req.headers.authorization?.replace(regex, '');
  if (!accessTokenFromHeader) {
    return res.status(400).send('Không tìm thấy access token.');
  }

  // Lấy refresh token từ body
  const refreshTokenFromBody = req.body.refreshToken;
  if (!refreshTokenFromBody) {
    return res.status(400).send('Không tìm thấy refresh token.');
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'Baobao';

  // Decode access token đó
  const decoded = await decodeToken(accessTokenFromHeader, accessTokenSecret);
  if (!decoded) {
    return res.status(400).send('Access token không hợp lệ.');
  }

  const username = decoded.payload; // Lấy username từ payload

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(401).send('User không tồn tại.');
  }

  if (refreshTokenFromBody !== user.refreshToken) {
    return res.status(400).send('Refresh token không hợp lệ.');
  }

  // Tạo access token mới
  const dataForAccessToken = username;

  const accessToken = await generateToken(dataForAccessToken, accessTokenSecret);
  if (!accessToken) {
    return res.status(400).send('Tạo access token không thành công, vui lòng thử lại.');
  }
  return res.json({
    accessToken,
  });
};

export { postSignIn, postSignUp, postRefreshToken };
