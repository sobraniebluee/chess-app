import {NextFunction, Request, Response} from "express";
import ApiError from "./api-error.middleware";
import TokenService from "../services/token.service";
import {TokenData} from "../interfaces/tokens.interfaces";

type Params = {optional?: boolean, isRefresh?: boolean}
const defaultParams = { optional: false, isRefresh: false};

export default function authMiddleware({optional, isRefresh}: Params = defaultParams) {
    return async function (req: Request, res: Response, next: NextFunction) {
        req.body.identity = {};
        try {
            let token = req.cookies[isRefresh ? "refresh_token" : "access_token"] ?? req.headers.authorization;
            if (!token) {
                if (optional) {
                    return next();
                }
                return next(ApiError.UnauthorizedError("TOKEN_EMPTY"));
            }
            let tokenData: TokenData;
            if (isRefresh) {
                tokenData = TokenService.decodeRefreshToken(token);
            } else {
                tokenData = TokenService.decodeAccessToken(token);
            }
            await TokenService.compareTokenWithDb(tokenData.payload, token, isRefresh ? "refresh_token" : "access_token");
            req.body.identity = tokenData.payload;
            return next();
        } catch (e) {
            return next(e);
        }
    }
}
