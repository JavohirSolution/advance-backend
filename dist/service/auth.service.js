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
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = __importDefault(require("./token.service"));
const mail_service_1 = __importDefault(require("./mail.service"));
const base_error_1 = __importDefault(require("../errors/base.error"));
class AuthService {
    register(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, } = body;
            const userExist = yield user_model_1.default.findOne({ email });
            const ExistUsername = yield user_model_1.default.findOne({ username });
            if (!username || !email || !password) {
                throw base_error_1.default.BadrequestError("Gaps need to be filled");
            }
            else {
                if (userExist) {
                    throw base_error_1.default.BadrequestError(`User with existing email: ${email} already registered`);
                }
                else if (ExistUsername) {
                    throw base_error_1.default.BadrequestError(`User with existing username: ${username} already registered`);
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const user = yield user_model_1.default.create(Object.assign(Object.assign({}, body), { password: hashedPassword }));
                    // mail service
                    yield mail_service_1.default.sendMail(email, `${process.env.API_URL}/api/auth/activation/${user._id}`);
                    // jwt generatsiya
                    const tokens = token_service_1.default.generateToken(user._id);
                    yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
                    // token
                    return Object.assign({ user }, tokens);
                }
            }
        });
    }
    activation(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.default.findById(userID);
            if (!user) {
                throw base_error_1.default.BadrequestError("User not found");
            }
            user.isActivated = true;
            yield user.save();
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw base_error_1.default.BadrequestError("User not found");
            }
            const isPassport = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassport) {
                throw base_error_1.default.BadrequestError("Passport is incorrect");
            }
            // jwt generatsiya
            const tokens = token_service_1.default.generateToken(user._id);
            yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
            return Object.assign({ user }, tokens);
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.default.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw base_error_1.default.UnauthorizedError("Bad authoration");
            }
            // console.log(refreshToken)
            const decode = yield token_service_1.default.validateRefreshToken(refreshToken);
            const tokenDb = yield token_service_1.default.findToken(refreshToken);
            // console.log(tokenDb)
            if (!decode || !tokenDb) {
                throw base_error_1.default.UnauthorizedError("Bad authoration");
            }
            const user = yield user_model_1.default.findById({ _id: decode.id });
            // jwt generatsiya
            const tokens = token_service_1.default.generateToken(user._id);
            yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
            return Object.assign({ user }, tokens);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.find();
        });
    }
}
exports.default = new AuthService();
