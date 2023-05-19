import {UserModel} from "../models/user.model";
import {UserDto} from "../dto/user.dto";
import ApiError from "../middlewares/api-error.middleware";
import {UserResponse} from "../interfaces/user.interfaces";

export default class UserService {
    static async getOne(id: string): Promise<UserDto> {
        const user = await UserModel.findOne({_id: id});
        if (!user) throw ApiError.NotFound();

        return new UserDto(user as UserResponse);
    }
}