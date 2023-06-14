import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: 'database/database.sqlite',
    entities: [
        "dist/src/**/*.entity.js"
    ],
    migrations: [
        "dist/database/migrations/*.js",
    ]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
