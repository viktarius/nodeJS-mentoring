import { DatabaseService } from "./database.service";
import { UserRequest } from "../models/user.model";

export class UserService extends DatabaseService {
    constructor() {
        super();
    }

    getAll() {
        return this.client.query("SELECT * FROM users")
    }

    addUser(user: UserRequest) {
        const query = {
            text: 'INSERT INTO users(id, login, password, age, isdeleted) VALUES($1, $2, $3, $4, $5)',
            values: [user.id, user.login, user.password, user.age, user.isDeleted]
        };

        return this.client.query(query)
    }

    updateUser(id: string, user: any) {
        const query = {
            text: 'UPDATE users set login = $2, password = $3, age = $4 WHERE id = $1',
            values: [id, user.login, user.password, user.age]
        };

        return this.client.query(query)
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