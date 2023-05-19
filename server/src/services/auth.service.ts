import {LoginUserAuthRequest, RegistrationUserAuthRequest} from "../interfaces/auth.interfaces";
import {UserDto} from "../dto/user.dto";
import {UserModel} from "../models/user.model";
import ApiError from "../middlewares/api-error.middleware";
import {TokensResponse} from "../interfaces/tokens.interfaces";
import TokenService from "./token.service";
import * as bcrypt from "bcrypt";

export default class AuthService {

    static async registration(data: RegistrationUserAuthRequest): Promise<{ user: UserDto, tokens: TokensResponse }> {
        if (await this.getUserByField("email", data.email)) {
            throw ApiError.defaultErrorByKey("EMAIL_ALREADY_USED")
        }

        if (await this.getUserByField("username", data.username)) {
            throw ApiError.defaultErrorByKey("USERNAME_ALREADY_USED")
        }
        data.password = await this.hashPassword(data.password);
        const user = await UserModel.create(data);
        const tokens = await TokenService.createTokens(user._id);
        return {user: new UserDto(user), tokens};
    }

    static async login({email, password}: LoginUserAuthRequest): Promise<{ user: UserDto, tokens: TokensResponse }> {
        const user = await this.getUserByField("email", email);
        if (!user) {
            throw ApiError.defaultErrorByKey("USERNAME_NOT_FOUND")
        }
        if (!(await this.checkPassword(password, user?.password as string))) {
            throw ApiError.defaultErrorByKey("PASSWORD_NOT_MATCH")
        }
        const tokens = await TokenService.createTokens(user._id);
        return {user: new UserDto(user), tokens};
    }

    static async getUserByField(field: "email" | "username", value: string) {
        return (await UserModel.findOne({[field]: value}));
    }

    static async hashPassword(password: string) {
        return await bcrypt.hash(password, 10)
    }

    static async checkPassword(password: string, hashedPassword: string) {
        return (await bcrypt.compare(password, hashedPassword))
    }
}