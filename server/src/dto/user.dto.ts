import {TokensResponse} from "../interfaces/tokens.interfaces";
import {UserResponse} from "../interfaces/user.interfaces";

class TokensDto implements TokensResponse {
    refresh_token: string;
    access_token: string;

    constructor({access_token, refresh_token}: TokensResponse) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}

class UserDto {
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    username: string;
    created_at: number
    updated_at: number
    is_activated: boolean

    constructor(model: UserResponse) {
        this.email = model.email;
        this.username = model.username;
        this.first_name = model.first_name;
        this.second_name = model.second_name;
        this.id = model._id;
        this.created_at = model.created_at;
        this.updated_at = model.updated_at;
        this.is_activated = model.is_activated;
    }

}
export { UserDto };