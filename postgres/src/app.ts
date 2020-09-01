import express from "express";
import router from "./controllers";
import { port } from "./config/app.config";
import { initDB } from "./services/database.service";

const app: express.Application = express();

app.use(express.json());

app.use(router);

app.listen(port, async () => {
    await initDB();
    console.log(`App is listening on port: ${port}!`);
});
