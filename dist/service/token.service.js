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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_model_1 = __importDefault(require("../model/token.model"));
dotenv_1.default.config();
class TokenService {
    generateToken(id) {
        const access_secret = process.env.JWT_ACCESS_TOKEN;
        if (!access_secret) {
            throw new Error('JWT_ACCESS_TOKEN is not defined');
        }
        const refresh_secret = process.env.JWT_REFRESH_TOKEN;
        if (!refresh_secret) {
            throw new Error('JWT_REFRESH_TOKEN is not defined');
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: id }, access_secret, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: id }, refresh_secret, { expiresIn: "30d" });
        return { accessToken, refreshToken };
    }
    saveToken(userID, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const existToken = yield token_model_1.default.findOne({ user: userID });
            if (existToken) {
                existToken.refreshToken = refreshToken;
                return yield existToken.save();
            }
            const token = yield token_model_1.default.create({ user: userID, refreshToken });
            return token;
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield token_model_1.default.findOneAndDelete({ refreshToken });
        });
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_model_1.default.findOne({ refreshToken });
            // console.log(token, "token")
            return token;
        });
    }
    validateRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refresh_secret = process.env.JWT_REFRESH_TOKEN;
                if (!refresh_secret) {
                    throw new Error('JWT_REFRESH_TOKEN is not defined');
                }
                const decode = jsonwebtoken_1.default.verify(token, refresh_secret);
                return decode;
            }
            catch (error) {
                return null;
            }
        });
    }
    validateAccessToken(token) {
        try {
            const access_secret = process.env.JWT_ACCESS_TOKEN;
            if (!access_secret) {
                throw new Error('JWT_ACCESS_TOKEN is not defined');
            }
            return jsonwebtoken_1.default.verify(token, access_secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = new TokenService();
