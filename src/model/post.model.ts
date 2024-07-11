import { Schema, model, models } from "mongoose";

interface Post {
    title: string;
    body: string;
    picture?: string
    author: object
}

const postSchema = new Schema<Post>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    picture: { type: String },
    author: { type: Schema.ObjectId, ref: "User" }
}, { timestamps: true })

const Post = models.Post || model<Post>("Post", postSchema)

export default Post