import {Router} from "express";
import * as dotenv from "dotenv"
import auth from "./auth.routes";

dotenv.config()

const router = Router();

router.use(process.env.PREFIX + "/auth", auth)

export default router;