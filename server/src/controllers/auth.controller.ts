import {NextFunction, Request, Response} from "express";
import {LoginUserAuthRequest, RegistrationUserAuthRequest} from "../interfaces/auth.interfaces";
import AuthService from "../services/auth.service";
import {UserDto} from "../dto/user.dto";
import UserService from "../services/user.service";
import TokenService from "../services/token.service";
import {UserIdentityRequest} from "../interfaces/tokens.interfaces";


export default class AuthController {
    static async login(req: Request<never, never, LoginUserAuthRequest>, res: Response<UserDto>, next: NextFunction) {
        try {
            const {user, tokens} = await AuthService.login(req.body);
            return res.cookie("access_token", tokens.access_token, {domain: "127.0.0.1", sameSite: "none", secure: true})
                .cookie("refresh_token", tokens.refresh_token, {domain: "127.0.0.1", sameSite: "none", secure: true})
                .json(user)
                .status(200);
        } catch (e) {
            next(e)
        }
    }
    static async registration(req: Request<never, never, RegistrationUserAuthRequest>, res: Response<UserDto>, next: NextFunction) {
        try {
            const {user, tokens} = await AuthService.registration(req.body);
            return res.cookie("access_token", tokens.access_token, {domain: "127.0.0.1", sameSite: "none", secure: true})
                .cookie("refresh_token", tokens.refresh_token, {domain: "127.0.0.1", sameSite: "none", secure: true})
                .json(user)
                .status(200);
        } catch (e) {
            next(e)
        }
    }
    static async refresh(req: Request<never, never, UserIdentityRequest>, res: Response, next: NextFunction) {
        try {
            const tokens = await TokenService.createTokens(req.body.identity.id);
            res.cookie("access_token", tokens.access_token)
                .cookie("refresh_token", tokens.refresh_token)
                .json(tokens)
                .status(200);
        } catch (e) {
            next(e);
        }
    }
    static async protectedFn(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(req.body.identity).status(200);
        } catch (e) {
            next(e);
        }
    }
    static async logout(req: Request<never, never, UserIdentityRequest>, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getOne(req.body.identity.id)
            await TokenService.deleteTokens(user.id)
            res.status(204).json(null);
        } catch (e) {
            next(e)
        }
    }
}


