import { Schema, model, models } from "mongoose";

export interface User {
    username: string,
    email: string,
    password: string
    isActivated?: boolean
    role?: string
}

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["user", "admin", "banned"],
        default: "user"
    }
}, { timestamps: true })

const User = models.User || model<User>("User", userSchema)

export default User 