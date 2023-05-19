import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import ApiError from "./api-error.middleware";
import {FieldErrorMessages} from "../errors-messages";

export default class Validator {
    static validate(req: Request, res: Response<{isError: boolean, message: any}>, next: NextFunction) {
        const errors = validationResult(req).formatWith(({param, msg, location}) => {
            return `${msg}`
        })
        if (!errors.isEmpty()) {
            throw ApiError.defaultErrorByKey(errors.array()[0] as FieldErrorMessages, 422);
        }
        next()
    }
}