import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const config = {
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
};

console.log(config);

export class DatabaseService {
    client: Client;

    constructor() {
        this.client = new Client(config);
        this.client.connect().then()
    }

    async getAll(){
        return this.client.query("SELECT * FROM users")
    }

}
