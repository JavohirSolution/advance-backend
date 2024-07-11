"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
router.post("/register", auth_controller_1.default.register);
router.get("/activation/:id", auth_controller_1.default.activation);
router.post("/login", auth_controller_1.default.login);
router.post("/logout", auth_controller_1.default.logout);
router.get("/refresh", auth_controller_1.default.refresh);
router.get("/get-users", auth_middleware_1.default, auth_controller_1.default.getUsers);
exports.default = router;
