import express from "express";
import cors, { CorsOptions } from 'cors';

import router from "./routes";
import { AVAILABLE_DOMAIN } from "./config/app.config";
import { errorMiddleware, infoLoggerMiddleware } from "./core/middleware";

const app: express.Application = express();

const corsOptions: CorsOptions = {
    origin: AVAILABLE_DOMAIN
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(infoLoggerMiddleware);

app.use(router);

app.use(errorMiddleware);

export { app };
