import dotenv from "dotenv";

dotenv.config();

export const config = {
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
};
