/**
 * The configuration in this file is used for the migration of the database,
 * and for the default connection of the database to the app.
 */

import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [
        "dist/**/*.entity.js",
    ],
    migrations: [
        "dist/database/migrations/*.js",
    ]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
