import {errorMessagesLocales, FieldErrorMessages} from "../errors-messages";

export default class ApiError extends Error {
    statusCode: number;
    isOperational: true;
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
    }

    static NotFound() {
        return new ApiError("Not found!", 404);
    }
    static ServerError(): Error {
        return  new ApiError("Server error!", 500);
    }
    static defaultError(message: string, statusCode = 400) {
        return new ApiError(message, statusCode);
    }
    static defaultErrorByKey(message: FieldErrorMessages, statusCode = 400) {
        return  new ApiError(errorMessagesLocales(message, process.env.LANG) || message, statusCode);
    }
    static UnauthorizedError(message: FieldErrorMessages | string) {
        return new ApiError(errorMessagesLocales(message, process.env.LANG) || message, 401)
    }
}


