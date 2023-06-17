import { Item } from '../../item/item.entity';
import { define } from 'typeorm-seeding';
import { faker as Faker } from '@faker-js/faker';

define(Item, (faker: typeof Faker) => {
  const item = new Item();

  item.title = faker.lorem.sentence();

  return item;
});
