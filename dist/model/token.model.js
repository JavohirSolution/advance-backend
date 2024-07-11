"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true, }
});
const Token = mongoose_1.models.Token || (0, mongoose_1.model)("Token", tokenSchema);
exports.default = Token;
