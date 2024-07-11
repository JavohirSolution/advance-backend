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
const file_service_1 = __importDefault(require("./file.service"));
class PostService {
    create(post, picture, author) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = file_service_1.default.save(picture);
            const newPost = yield post_model_1.default.create(Object.assign(Object.assign({}, post), { picture: fileName, author }));
            return newPost;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_model_1.default.find();
            return posts;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePost = yield post_model_1.default.findByIdAndDelete(id);
            return deletePost;
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Id not found");
            }
            const updatePost = yield post_model_1.default.findByIdAndUpdate(id, body, {
                new: true
            });
            return updatePost;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Id not found");
            }
            const getOnePost = yield post_model_1.default.findById(id);
            return getOnePost;
        });
    }
}
exports.default = new PostService();
