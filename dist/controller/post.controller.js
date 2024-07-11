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
const post_service_1 = __importDefault(require("../service/post.service"));
const base_error_1 = __importDefault(require("../errors/base.error"));
class PostController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_service_1.default.getAll();
                res.status(200).json({
                    data: posts,
                    message: "Get all posts"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.files || !req.files.picture) {
                    return res.status(400).json({
                        message: "Picture file is required"
                    });
                }
                if (!req.user) {
                    return next(base_error_1.default.UnauthorizedError("User is not authorized"));
                }
                const post = yield post_service_1.default.create(req.body, req.files.picture, req.user);
                res.status(201).json({
                    data: post,
                    message: "Created"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const post = yield post_service_1.default.delete(id);
                res.status(200).json({
                    data: post,
                    message: "Deleted"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const post = yield post_service_1.default.update(id, req.body);
                res.status(200).json({
                    data: post,
                    message: "Updated"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const post = yield post_service_1.default.getOne(id);
                res.status(200).json({
                    data: post,
                    message: "Get by Id"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new PostController();
