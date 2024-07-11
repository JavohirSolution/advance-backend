import { Request, Response, NextFunction } from "express"
import BaseError from "../errors/base.error"
import tokenService from "../service/token.service"
import User from "../model/user.model"

export interface UserI extends Request {
    user?: object
}

const authMiddleware = async (req: UserI, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return next(BaseError.UnauthorizedError("User is not authorized"))
        }
        const accessToken = token.split(" ")[1]
        if (!accessToken) {
            return next(BaseError.UnauthorizedError("User is not authorized"))
        }

        const userData: any = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(BaseError.UnauthorizedError("User is not authorized"))
        }

        const user = await User.findById({ _id: userData.id })
        if (!user) {
            return next(new Error("User is not defined"));
        }

        req.user = user
        console.log(req.user, "auth middile")
        next()
    } catch (error) {
        return next(BaseError.UnauthorizedError("User is not authorized"))
    }
}

export default authMiddleware