import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken'

const generateToken = (payLoad: string) => {
  return '';
  // const secretSignature 
  // return jwt.sign(payLoad, secretSignature, keyTokenLife)
}

const postSignIn = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password
  const user = await User.findOne({ username: username })
  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).send('Mật khẩu không chính xác.');
  }

  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const dataForAccessToken = user.username;

  const accessToken = generateToken(dataForAccessToken);
  if (!accessToken) {
    return res
      .status(401)
      .send('Đăng nhập không thành công, vui lòng thử lại.');
  }

  // let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
  // if (!user.refreshToken) {
  // 	// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
  // 	await userModel.updateRefreshToken(user.username, refreshToken);
  // } else {
  // 	// Nếu user này đã có refresh token thì lấy refresh token đó từ database
  // 	refreshToken = user.refreshToken;
  // }

  // return res.json({
  // 	msg: 'Đăng nhập thành công.',
  // 	accessToken,
  // 	refreshToken,
  // 	user,
  // });
}

const postSignUp = async (req: Request, res: Response) => {
  const username = req.body.username.toLowerCase();
  const user = await User.findOne({ username: username });
  if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
  else {
    const hashPassword = bcrypt.hashSync(req.body.password, 1);
    const newUser = {
      username: username,
      password: hashPassword,
      email: req.body.email

    };
    const createUser = await User.create(newUser);
    if (!createUser) {
      return res
        .status(400)
        .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
    }
    return res.send({
      username,
    });
  }
}

export {
  postSignIn,
  postSignUp
};
