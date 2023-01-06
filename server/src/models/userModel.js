"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        max: 15,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    refreshToken: {
        type: String
    }
}, { versionKey: false });
const User = mongoose_1.default.model("Users", userSchema, 'users');
exports.User = User;
