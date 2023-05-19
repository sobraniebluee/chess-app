import express from "express";
import * as dotenv from "dotenv"
import router from "./routers";
import morgan from "morgan";
import * as fs from "fs";
import * as Events from "events";
import mongoose from "mongoose";
import ErrorHandler from "./middlewares/error-handler.middleware";
import parsedCookies from "./middlewares/parsed-cookies.middleware";
import cors, {CorsOptions} from "cors";

dotenv.config()

const corsOptions: CorsOptions = {
    origin: "http://localhost:63342",
    credentials: true
}

class Server {
    private emitter: Events.EventEmitter;

    constructor() {
        this.emitter = new Events.EventEmitter();
    }

    run() {
        console.log("Starting...")
        this.emitter.on("start", () => this.startServer());
        this.connectDatabase();
    }
    private connectDatabase() {
        mongoose.connect(process.env.DB as string)
            .then(() => {
                console.log("Database successfully connected!")
                this.emitter.emit("start");
            })
            .catch(err => {
                console.log("Database error: ", err.message)
                process.exit(2);
            })
    }
    private startServer() {
        const app = express();
        app.use(cors(corsOptions))
        app.use(express.json());
        app.use(parsedCookies)
        if (process.env.MODE == "DEVELOPMENT") {
            app.use(morgan("dev"))
        }

        app.use(morgan("common", {
            stream: fs.createWriteStream("./logs/logger.logs"),
        }))
        app.use(router);
        app.use(ErrorHandler.apiError);
        app.use(ErrorHandler.routerError);
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server successfully start on http://127.0.0.1:" + process.env.PORT || 5000);
        });
    }
}


const app = new Server();
app.run();

