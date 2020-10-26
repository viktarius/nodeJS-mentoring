import { logger } from "./core/logger";
import { PORT } from "./config/app.config";
import { initData, initDB } from "./core/services/database.service";
import { app } from "./app";

process.on('uncaughtException', (err) => {
    logger.error("[Inside 'uncaughtException' event]" + err.stack || err.message);
}).on('unhandledRejection', (reason, p) => {
    logger.error(reason + 'Unhandled Rejection at Promise' + p);
});

app.listen(PORT, async () => {
    await initDB();
    await initData();
    console.log(`App is listening on port: ${PORT}!`);
});
