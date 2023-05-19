import mongoose, {Schema} from "mongoose";

const TokenSchema = new Schema({
        access_token: {type: String, required: true},
        refresh_token: {type: String, required: true},
        user: {type: Schema.Types.ObjectId, ref: "User"},
    },
    {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}})

export const TokenModel = mongoose.model("Token", TokenSchema)
