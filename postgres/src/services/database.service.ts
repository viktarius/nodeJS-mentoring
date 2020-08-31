import Knex from "knex";

import { config } from "../config/db.config";

export const pg = Knex({
    client: 'pg',
    connection: {
        ...config
    },
    acquireConnectionTimeout: 2000
});
