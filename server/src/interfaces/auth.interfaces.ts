import {UserResponse} from "./user.interfaces";
import {TokensResponse} from "./tokens.interfaces";

export interface RegistrationUserAuthRequest  {
    email: string,
    first_name: string,
    second_name: string,
    username: string,
    password: string
}

export interface LoginUserAuthRequest {
    email: string,
    password: string
}

export interface UserAuthResponse extends UserResponse {

}