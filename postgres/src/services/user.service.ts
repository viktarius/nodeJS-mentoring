import { DatabaseService } from "./database.service";

export class UserService extends DatabaseService{
    constructor() {
        super();
    }

    getAll() {
        return this.client.query("SELECT * FROM users")
    }

    getUserById(id: string): Promise<any> {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id],
        };

        return this.client.query(query)
    }

    deleteUser(id: string) {
        const query = {
            text: 'UPDATE users set isdeleted = 1 WHERE id = $1',
            values: [id]
        };

        return this.client.query(query);
    }

}