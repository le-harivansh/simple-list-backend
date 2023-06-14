import { Item } from "../../item/item.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class DatabaseSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await factory(Item)().createMany(10);
    }

}
