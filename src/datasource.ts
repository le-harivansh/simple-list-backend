import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { Item } from "./item/item.entity";
import { CreateItemsTable1686721941399 } from "./migrations/1686721941399-create_items_table";
import { CreateItemsTable1686722687524 } from "../database/migrations/1686722687524-create_items_table";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: `${path.resolve(__dirname, '..')}/database/database.sqlite`,
    entities: [Item],
    migrations: [
        // CreateItemsTable1686721941399
        // "../database/migrations/*.ts",
        CreateItemsTable1686722687524
    ]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
