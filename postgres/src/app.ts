import express from "express";
import dotenv from "dotenv";
import router from "./controllers";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app: express.Application = express();

app.use(express.json());

app.use(router);

app.listen(PORT, function () {
    console.log(`App is listening on port: ${PORT}!`);
});
