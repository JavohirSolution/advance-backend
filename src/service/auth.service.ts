import User from "../model/user.model";
import bcrypt from "bcrypt"
import { Request, Response } from 'express';
import tokenService from "./token.service";
import mailService from "./mail.service";
import BaseError from "../errors/base.error";

export type registerParams = {
    username: string,
    email: string,
    password: string
    isActivated?: boolean
    role?: string
}

export type loginParams = {
    email: string,
    password: string
}

class AuthService {
    async register(body: registerParams, res: Response) {
        const { username, email, password, } = body
        const userExist = await User.findOne({ email })
        const ExistUsername = await User.findOne({ username })

        if (!username || !email || !password) {
            throw BaseError.BadrequestError("Gaps need to be filled");
        } else {
            if (userExist) {
                throw BaseError.BadrequestError(`User with existing email: ${email} already registered`);
            } else if (ExistUsername) {
                throw BaseError.BadrequestError(`User with existing username: ${username} already registered`);
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await User.create({ ...body, password: hashedPassword })

                // mail service
                await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${user._id}`)

                // jwt generatsiya
                const tokens = tokenService.generateToken(user._id);
                await tokenService.saveToken(user._id, tokens.refreshToken)

                // token
                return { user, ...tokens }
            }
        }
    }

    async activation(userID: string) {
        let user = await User.findById(userID)
        if (!user) {
            throw BaseError.BadrequestError("User not found")
        }
        user.isActivated = true
        await user.save();
    }

    async login(body: loginParams) {
        const { email, password } = body
        const user = await User.findOne({ email });
        if (!user) {
            throw BaseError.BadrequestError("User not found")
        }

        const isPassport = await bcrypt.compare(password, user.password);
        if (!isPassport) {
            throw BaseError.BadrequestError("Passport is incorrect");
        }

        // jwt generatsiya
        const tokens = tokenService.generateToken(user._id);
        await tokenService.saveToken(user._id, tokens.refreshToken);

        return { user, ...tokens }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw BaseError.UnauthorizedError("Bad authoration")
        }
        // console.log(refreshToken)
        const decode = await tokenService.validateRefreshToken(refreshToken);
        const tokenDb = await tokenService.findToken(refreshToken)
        // console.log(tokenDb)
        if (!decode || !tokenDb) {
            throw BaseError.UnauthorizedError("Bad authoration")
        }

        const user = await User.findById({ _id: decode.id })

        // jwt generatsiya
        const tokens = tokenService.generateToken(user._id);
        await tokenService.saveToken(user._id, tokens.refreshToken);

        return { user, ...tokens }
    }

    async getUsers() {
        return await User.find()
    }
}


export default new AuthService()

