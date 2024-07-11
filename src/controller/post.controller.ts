import { NextFunction, Request, Response } from 'express';
import postService from "../service/post.service";
import BaseError from '../errors/base.error';

export interface UserI extends Request {
    user?: object
}

class PostController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getAll();
            res.status(200).json({
                data: posts,
                message: "Get all posts"
            })
        } catch (error) {
            next(error)
        }
    }

    async create(req: UserI, res: Response, next: NextFunction) {
        try {
            if (!req.files || !req.files.picture) {
                return res.status(400).json({
                    message: "Picture file is required"
                });
            }
            if (!req.user) {
                return next(BaseError.UnauthorizedError("User is not authorized"))
            }

            const post = await postService.create(req.body, req.files.picture, req.user);
            res.status(201).json({
                data: post,
                message: "Created"
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const post = await postService.delete(id)
            res.status(200).json({
                data: post,
                message: "Deleted"
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const post = await postService.update(id, req.body);
            res.status(200).json({
                data: post,
                message: "Updated"
            })
        } catch (error) {
            next(error)
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const post = await postService.getOne(id)
            res.status(200).json({
                data: post,
                message: "Get by Id"
            })
        } catch (error) {
            next(error)
        }
    }
}



export default new PostController()