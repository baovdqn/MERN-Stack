"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const userModel_1 = require("../models/userModel");
const verifyToken = (token, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, jsonwebtoken_1.verify)(token, secretKey, { complete: true });
    }
    catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
    }
});
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const regex = /(Bearer)\s+/g;
    const accessTokenFromHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(regex, '');
    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const verified = yield verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!verified) {
        return res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!');
    }
    const user = yield userModel_1.User.findOne({ username: verified.payload.username });
    req.user = user;
    return next();
});
exports.authMiddleWare = authMiddleWare;
