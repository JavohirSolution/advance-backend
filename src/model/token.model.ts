import { Schema, model, models } from "mongoose";

interface Token {
    user: Object,
    refreshToken: string,
}

const tokenSchema = new Schema<Token>({
    user: { type: Schema.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true, }
})

const Token = models.Token || model("Token", tokenSchema)

export default Token