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
const base_error_1 = __importDefault(require("../errors/base.error"));
const token_service_1 = __importDefault(require("../service/token.service"));
const user_model_1 = __importDefault(require("../model/user.model"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(base_error_1.default.UnauthorizedError("User is not authorized"));
        }
        const accessToken = token.split(" ")[1];
        if (!accessToken) {
            return next(base_error_1.default.UnauthorizedError("User is not authorized"));
        }
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(base_error_1.default.UnauthorizedError("User is not authorized"));
        }
        const user = yield user_model_1.default.findById({ _id: userData.id });
        if (!user) {
            return next(new Error("User is not defined"));
        }
        req.user = user;
        console.log(req.user, "auth middile");
        next();
    }
    catch (error) {
        return next(base_error_1.default.UnauthorizedError("User is not authorized"));
    }
});
exports.default = authMiddleware;
