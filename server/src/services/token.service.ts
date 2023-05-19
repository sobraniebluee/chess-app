import * as jwt from "jsonwebtoken";
import {TokenData, TokensResponse} from "../interfaces/tokens.interfaces";
import ApiError from "../middlewares/api-error.middleware";
import {TokenModel} from "../models/token.model";

export default class TokenService {
    static async createTokens(id: string): Promise<TokensResponse> {
        const access_token = jwt.sign(
            { payload: {id} },
            process.env.JWT_ACCESS_SECRET as string,
            {expiresIn: process.env.JWT_ACCESS_EXP});

        const refresh_token = jwt.sign(
            { payload: {id} },
            process.env.JWT_REFRESH_SECRET as string,
            {expiresIn: process.env.JWT_REFRESH_EXP});

        await this.saveTokens(id, { access_token, refresh_token });

        return {
            access_token,
            refresh_token
        };
    }

    static async saveTokens(idUser: string, tokens: TokensResponse) {
        const prevTokens = await TokenModel.findOne({user: idUser});
        if (prevTokens) {
            await TokenModel.updateOne({user: idUser}, {
                $set: {
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                }
            });
        } else {
            await new TokenModel({user: idUser, ...tokens}).save();
        }
    }

    static async deleteTokens(idUser: string) {
        const {deletedCount} = await TokenModel.deleteOne({user: idUser});
        if (deletedCount == 1) {
            return true;
        }
        throw ApiError.defaultErrorByKey("LOGOUT");
    }

    static async compareTokenWithDb(payload: TokenData["payload"], token: string, field: "access_token" | "refresh_token" = "access_token") {
        const data = await TokenModel.findOne({user: payload.id});
        if (!data) {
            throw ApiError.UnauthorizedError("TOKEN_NOT_VALID");
        }
        if (data[field] != token) {
            throw ApiError.UnauthorizedError("TOKEN_NOT_VALID");
        }
        return true;
    }

    static decodeAccessToken(token: string): TokenData {
        try {
            return jwt.verify<TokenData>(token, process.env.JWT_ACCESS_SECRET as string);
        } catch (e: any) {
            throw ApiError.UnauthorizedError(process.env.MODE === "DEVELOPMENT" ? `Error verified jwt [access]: ${e.message}` : "TOKEN_NOT_VALID");
        }
    }

    static decodeRefreshToken(token: string) {
        try {
            return jwt.verify<TokenData>(token, process.env.JWT_REFRESH_SECRET as string);
        } catch (e: any) {
            throw ApiError.UnauthorizedError(process.env.MODE === "DEVELOPMENT" ? `Error verified jwt [refresh]: ${e.message}` : "TOKEN_NOT_VALID");
        }
    }
}