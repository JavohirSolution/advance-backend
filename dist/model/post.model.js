"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    picture: { type: String },
    author: { type: mongoose_1.Schema.ObjectId, ref: "User" }
}, { timestamps: true });
const Post = mongoose_1.models.Post || (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
