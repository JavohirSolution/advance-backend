import { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.register(req.body, res)

            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(201).json({
                data: user,
                message: "Created"
            })
        } catch (error) {
            next(error)
        }
    }

    async activation(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id
            await authService.activation(userId)
            return res.redirect("http://google.com")
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.login(req.body)
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(201).json({
                data: user,
                message: "Created"
            })
        } catch (error) {
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.json({
                token
            })
        } catch (error) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const user = await authService.refresh(refreshToken)
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(200).json({
                data: user
            })
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await authService.getUsers()
            return res.status(200).json({
                users
            })
        } catch (error) {
            next(error)
        }
    }
}


export default new AuthController()