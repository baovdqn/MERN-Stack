"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRefreshToken = exports.postSignUp = exports.postSignIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const rand_token_1 = __importDefault(require("rand-token"));
const generateToken = (payLoad, secretSignature) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        algorithm: 'HS256',
        expiresIn: '15m',
    };
    try {
        return yield jsonwebtoken_1.default.sign(payLoad, secretSignature, options);
    }
    catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
});
const decodeToken = (accessTokenFromHeader, accessTokenSecret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, jsonwebtoken_1.decode)(accessTokenFromHeader, { complete: true });
    }
    catch (error) {
        console.log(`Error in decodeToken: ${error}`);
        return null;
    }
});
const postSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield userModel_1.User.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Mật khẩu không chính xác.');
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const dataForAccessToken = {
        username: user.username
    };
    const accessToken = yield generateToken(dataForAccessToken, accessTokenSecret);
    if (!accessToken) {
        return res.status(401).send('Đăng nhập không thành công, vui lòng thử lại.');
    }
    let refreshToken = rand_token_1.default.generate(16); // tạo 1 refresh token ngẫu nhiên
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        yield userModel_1.User.findOneAndUpdate({ username: username }, { refreshToken: refreshToken });
    }
    else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }
    return res.json({
        msg: 'Đăng nhập thành công.',
        accessToken,
    });
});
exports.postSignIn = postSignIn;
const postSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username.toLowerCase();
    const user = yield userModel_1.User.findOne({ username: username });
    if (user)
        res.status(409).send('Tên tài khoản đã tồn tại.');
    else {
        const hashPassword = bcrypt_1.default.hashSync(req.body.password, 1);
        const newUser = {
            username: username,
            password: hashPassword,
            email: req.body.email,
        };
        const createUser = yield userModel_1.User.create(newUser);
        if (!createUser) {
            return res.status(400).send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
        }
        return res.send({
            username,
        });
    }
});
exports.postSignUp = postSignUp;
const postRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Lấy access token từ header
    const regex = /(Bearer)\s+/g;
    const accessTokenFromHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(regex, '');
    if (!accessTokenFromHeader) {
        return res.status(400).send('Không tìm thấy access token.');
    }
    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('Không tìm thấy refresh token.');
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    // Decode access token đó
    const decoded = yield decodeToken(accessTokenFromHeader, accessTokenSecret);
    if (!decoded) {
        return res.status(400).send('Access token không hợp lệ.');
    }
    console.log('decoded', decoded);
    const username = decoded.payload.username; // Lấy username từ payload
    const user = yield userModel_1.User.findOne({ username: username });
    if (!user) {
        return res.status(401).send('User không tồn tại.');
    }
    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send('Refresh token không hợp lệ.');
    }
    // Tạo access token mới
    const dataForAccessToken = {
        username: user.username
    };
    const accessToken = yield generateToken(dataForAccessToken, accessTokenSecret);
    if (!accessToken) {
        return res.status(400).send('Tạo access token không thành công, vui lòng thử lại.');
    }
    return res.json({
        accessToken,
    });
});
exports.postRefreshToken = postRefreshToken;
