import { Item } from '../../item/item.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class DatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Item)().createMany(10);
  }
}
