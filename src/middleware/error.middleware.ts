import { ErrorRequestHandler, Request, Response, NextFunction } from "express"
import BaseError from "../errors/base.error"


const errorMiddleware = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors 
        })
    }

    return res.status(500).json({ message: "Server Error" })
}

export default errorMiddleware