import Post from "../model/post.model";
import fileService from "./file.service";

export type CreateParams = {
    title: string,
    body: string,
}

export type UpdateParams = {
    title?: string,
    body?: string
}

class PostService {
    async create(post: CreateParams, picture: any, author: object) {
        const fileName = fileService.save(picture)
        const newPost = await Post.create({ ...post, picture: fileName, author });
        return newPost
    }

    async getAll() {
        const posts = await Post.find();
        return posts
    }

    async delete(id: string) {
        const deletePost = await Post.findByIdAndDelete(id)
        return deletePost
    }

    async update(id: string, body: UpdateParams) {
        if (!id) {
            throw new Error("Id not found")
        }
        
        const updatePost = await Post.findByIdAndUpdate(id, body, {
            new: true
        })

        return updatePost
    }

    async getOne(id: string) {
        if (!id) {
            throw new Error("Id not found")
        }
        const getOnePost = await Post.findById(id)

        return getOnePost
    }
}

export default new PostService()