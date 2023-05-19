import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import {loginSchemaValidator, reginSchemaValidator} from "../schemas/auth.schemas";
import Validator from "../middlewares/validator.middleware";
import HeadersMiddleware from "../middlewares/headers.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const auth = Router();

auth.post("/login",
    HeadersMiddleware.getLanguage,
    loginSchemaValidator,
    Validator.validate,
    AuthController.login
);
auth.post("/registration",
    HeadersMiddleware.getLanguage,
    reginSchemaValidator,
    Validator.validate,
    AuthController.registration
);
auth.post("/refresh",
    authMiddleware({isRefresh: true}),
    AuthController.refresh
);
auth.delete("/logout",
    authMiddleware(),
    AuthController.logout
);
auth.get("/protected",
    authMiddleware(),
    AuthController.protectedFn
);


export default auth;