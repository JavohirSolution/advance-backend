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
const auth_service_1 = __importDefault(require("../service/auth.service"));
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.default.register(req.body, res);
                res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                return res.status(201).json({
                    data: user,
                    message: "Created"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                yield auth_service_1.default.activation(userId);
                return res.redirect("http://google.com");
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.default.login(req.body);
                res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                return res.status(201).json({
                    data: user,
                    message: "Created"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield auth_service_1.default.logout(refreshToken);
                res.clearCookie("refreshToken");
                return res.json({
                    token
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const user = yield auth_service_1.default.refresh(refreshToken);
                res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
                return res.status(200).json({
                    data: user
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield auth_service_1.default.getUsers();
                return res.status(200).json({
                    users
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
