"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controller/post.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const author_middleware_1 = __importDefault(require("../middleware/author.middleware"));
const router = express_1.default.Router();
router.get("/get-all", post_controller_1.default.getAll);
router.post("/create", auth_middleware_1.default, post_controller_1.default.create);
router.delete("/delete/:id", auth_middleware_1.default, author_middleware_1.default, post_controller_1.default.delete);
router.put("/edit/:id", auth_middleware_1.default, post_controller_1.default.update);
router.get("/get-one/:id", post_controller_1.default.getOne);
exports.default = router;
