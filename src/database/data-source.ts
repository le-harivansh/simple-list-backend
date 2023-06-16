/**
 * The configuration in this file is used for the migration of the database,
 * and for the default connection of the database to the app.
 */

import { DataSource, DataSourceOptions } from "typeorm";
import { Item } from "../item/item.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.NODE_ENV === 'test' ? 'test-database.sqlite' : 'database.sqlite',
    entities: [
        // "dist/**/*.entity.js",
        Item
    ],
    migrations: [
        "dist/database/migrations/*.js",
    ],
    synchronize: process.env.NODE_ENV === 'test',
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
