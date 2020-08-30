import { Client } from "pg";
import { config } from "../config/db.config";

export class DatabaseService {
    client: Client;

    constructor() {
        this.client = new Client(config);
        this.client.connect();
    }

    disconnect() {
        this.client.end();
    }

}
