import {NextFunction, Request, Response} from "express";
import {AVAILABLE_LANGUAGES} from "../errors-messages";

export default class Headers {
    static getLanguage(req: Request, res: Response, next: NextFunction) {
        if (req.headers["accept-language"]) {
            const lang = req.headers["accept-language"]?.split(',')[0].split("-")[0];
            if (lang in AVAILABLE_LANGUAGES) {
                process.env.LANG = lang;
            }
        }
        next();
    }
}