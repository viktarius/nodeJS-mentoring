import Knex from "knex";

import { config } from "../config/db.config";
import { users } from "../seed/users";
import { groups } from "../seed/groups";
import { groupMapper } from "../mappers";

export const knex = Knex({
    client: 'pg',
    connection: {
        ...config
    },
    acquireConnectionTimeout: 2000
});

export const initDB = async () => {
    await knex.schema.hasTable('users').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('login', 50);
                table.string('password', 100);
                table.integer('age');
                table.boolean('isDeleted');
            })
        }
    });
    await knex.schema.hasTable('groups').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('groups', (table) => {
                table.increments('id').primary();
                table.string('name', 100);
                table.string('permissions', 100);
            })
        }
    })
};

export const initData = async () => {
    const userData = await knex('users').select('*');
    if (userData.length === 0) {
        await knex('users').insert(users);
    }
    const groupData = await knex('groups').select('*');
    if (groupData.length === 0) {
        await knex('groups').insert(groups.map(groupMapper.toBase));
    }
};
