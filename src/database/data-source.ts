import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [
        "**/*.entity.js",
    ],
    migrations: [
        "dist/database/migrations/*.js",
    ]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
