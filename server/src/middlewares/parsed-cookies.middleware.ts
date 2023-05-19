import {NextFunction, Request, Response} from "express";

export default function parsedCookies(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.cookie) {
        req.cookies = {}
        return next();
    }
    try {
        const cookiesDict: { [key in string]: string } = {};

        let cookies = req.headers.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let [key, value] = cookies[i].split("=")
            cookiesDict[key.trim()] = value.trim()
        }
        req.cookies = cookiesDict;
    } catch (e) {
        req.cookies = {};
    }
    next();
}