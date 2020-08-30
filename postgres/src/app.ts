import express from "express";
import router from "./controllers";
import { port } from "./config/app.config";

const app: express.Application = express();

app.use(express.json());

app.use(router);

app.listen(port, function () {
    console.log(`App is listening on port: ${port}!`);
});
