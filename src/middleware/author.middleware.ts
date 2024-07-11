import { Request, Response, NextFunction } from "express"
import Post from "../model/post.model"
import BaseError from "../errors/base.error"

export interface UserI extends Request {
    user?: {
        id: string
    }
}

const authhorMiddleware = async (req: UserI, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            // Handle the case where req.user is undefined
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const post = await Post.findById(req.params.id);
        const authhorId = req.user.id

        if (post.author !== authhorId) {
            return next(BaseError.BadrequestError("Only author can delete and update this post"))
        }
        next()
    } catch (error) {
        next(error)
    }
}


export default authhorMiddleware