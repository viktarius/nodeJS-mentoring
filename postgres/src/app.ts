import express from "express";

const PORT = Number(process.env.PORT) || 3000;
const app: express.Application = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("hello world!")
});

app.listen(PORT, function () {
    console.log(`App is listening on port: ${PORT}!`);
});
