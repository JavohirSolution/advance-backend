"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = __importDefault(require("../errors/base.error"));
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof base_error_1.default) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }
    return res.status(500).json({ message: "Server Error" });
};
exports.default = errorMiddleware;
