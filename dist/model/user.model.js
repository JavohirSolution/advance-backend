"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["user", "admin", "banned"],
        default: "user"
    }
}, { timestamps: true });
const User = mongoose_1.models.User || (0, mongoose_1.model)("User", userSchema);
exports.default = User;
