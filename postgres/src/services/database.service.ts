import Knex from "knex";

import { config } from "../config/db.config";
import { users } from "../seed/users";

export const knex = Knex({
    client: 'pg',
    connection: {
        ...config
    },
    acquireConnectionTimeout: 2000
});

export const initDB = () => knex.schema.hasTable('users').then((exists) => {
    if(!exists){
        return knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('login', 50);
            table.string('password', 100);
            table.integer('age');
            table.boolean('isDeleted');
        })
    }
});

export const initData = () => knex('users').select('*').then((data) => {
    if(data.length === 0){
        return knex('users').insert(users)
    }
});
