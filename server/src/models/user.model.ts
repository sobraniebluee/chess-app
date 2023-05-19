import mongoose, {Schema} from "mongoose";
import {UserResponse} from "../interfaces/user.interfaces";

export const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    created_at: {type: Number, required: false},
    updated_at: {type: Number, required: false},
    is_activated: {type: Boolean, default: false}
})

UserSchema.pre("save", function (next) {
    let now = Date.now();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next()
})
export const UserModel = mongoose.model<UserResponse>("User", UserSchema);


