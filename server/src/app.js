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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
// import authRoute from './routes/auth.route';
const users_route_1 = __importDefault(require("./routes/users.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv.config();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
//connect to db
const db_1 = __importDefault(require("./config/db"));
mongoose_1.default.connect(`mongodb://${db_1.default.host}:${db_1.default.port}/${db_1.default.db}`);
app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'App running',
    });
});
app.use('/auth', auth_route_1.default);
app.use('/user', users_route_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
