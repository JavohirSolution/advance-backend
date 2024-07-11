import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import Token from "../model/token.model";
dotenv.config()

class TokenService {
    generateToken(id: string) {
        const access_secret = process.env.JWT_ACCESS_TOKEN;
        if (!access_secret) {
            throw new Error('JWT_ACCESS_TOKEN is not defined');
        }
        const refresh_secret = process.env.JWT_REFRESH_TOKEN;
        if (!refresh_secret) {
            throw new Error('JWT_REFRESH_TOKEN is not defined');
        }

        const accessToken = jwt.sign({ id: id }, access_secret, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: id }, refresh_secret, { expiresIn: "30d" });

        return { accessToken, refreshToken };
    }

    async saveToken(userID: string, refreshToken: string) {
        const existToken = await Token.findOne({ user: userID })
        if (existToken) {
            existToken.refreshToken = refreshToken
            return await existToken.save()
        }

        const token = await Token.create({ user: userID, refreshToken })
        return token
    }

    async removeToken(refreshToken: string) {
        return await Token.findOneAndDelete({ refreshToken })
    }

    async findToken(refreshToken: string) {
        const token = await Token.findOne({ refreshToken })
        // console.log(token, "token")
        return token
    }

    async validateRefreshToken(token: string) {
        try {
            const refresh_secret = process.env.JWT_REFRESH_TOKEN;
            if (!refresh_secret) {
                throw new Error('JWT_REFRESH_TOKEN is not defined');
            }
            const decode: any = jwt.verify(token, refresh_secret)
            return decode
        } catch (error) {
            return null
        }
    }

    validateAccessToken(token: string) {
        try {
            const access_secret = process.env.JWT_ACCESS_TOKEN;
            if (!access_secret) {
                throw new Error('JWT_ACCESS_TOKEN is not defined');
            }
            return jwt.verify(token, access_secret)
        } catch (error) {
            return null
        }
    }
}

export default new TokenService();