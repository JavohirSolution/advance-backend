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
const post_model_1 = __importDefault(require("../model/post.model"));
const base_error_1 = __importDefault(require("../errors/base.error"));
const authhorMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            // Handle the case where req.user is undefined
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const post = yield post_model_1.default.findById(req.params.id);
        const authhorId = req.user.id;
        if (post.author !== authhorId) {
            return next(base_error_1.default.BadrequestError("Only author can delete and update this post"));
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authhorMiddleware;
