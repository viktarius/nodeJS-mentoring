import express from "express";
import router from "./controllers";
import { port } from "./config/app.config";
import { initData, initDB } from "./core/services/database.service";
import { errorMiddleware, infoLoggerMiddleware } from "./core/middleware";
import { logger } from "./core/logger";

const app: express.Application = express();

app.use(express.json());

app.use(infoLoggerMiddleware);

app.use(router);

app.use(errorMiddleware);

process.on('uncaughtException', (err) => {
    logger.error("[Inside 'uncaughtException' event]" + err.stack || err.message);
}).on('unhandledRejection', (reason, p) => {
    logger.error(reason + 'Unhandled Rejection at Promise' + p);
});

app.listen(port, async () => {
    await initDB();
    await initData();
    console.log(`App is listening on port: ${port}!`);
});
