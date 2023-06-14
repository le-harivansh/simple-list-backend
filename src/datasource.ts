import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { Item } from "./item/item.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: `${path.resolve(__dirname, '..')}/database/database.sqlite`,
    entities: [Item],
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
