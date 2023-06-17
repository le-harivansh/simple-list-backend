import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApplicationModule } from '../src/application.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../src/item/item.entity';
import { unlinkSync } from 'fs';
import { TEST_DATABASE_NAME } from '../src/database/constants';

describe('ItemController (e2e)', () => {
  const items: Item[] = [
    { id: 1, title: 'One' },
    { id: 2, title: 'Two' },
    { id: 3, title: 'Three' },
    { id: 4, title: 'Four' },
    { id: 5, title: 'Five' },
  ];

  let application: INestApplication;
  let itemsRepository: Repository<Item>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    application = moduleFixture.createNestApplication();
    await application.init();

    itemsRepository = moduleFixture.get(getRepositoryToken(Item));

    for (const item of items) {
      await itemsRepository.insert(item);
    }
  });

  afterEach(async () => {
    await itemsRepository.clear();
  });

  afterAll(() => {
    unlinkSync(`${__dirname}/../${TEST_DATABASE_NAME}`);
  });

  test('/items (GET)', () => {
    return request(application.getHttpServer())
      .get('/items')
      .expect(HttpStatus.OK)
      .expect(items);
  });

  test('/item/:id (GET)', () => {
    const itemToRetrieve = items.find(({ id }) => id === 4);

    if (!itemToRetrieve) {
      throw 'Did not retrieve the expected `itemToRetrieve`.';
    }

    return request(application.getHttpServer())
      .get(`/item/${itemToRetrieve.id}`)
      .expect(HttpStatus.OK)
      .expect(itemToRetrieve);
  });

  test('/item (POST)', () => {
    const newItemTitle = 'The new item';

    return request(application.getHttpServer())
      .post('/item')
      .send({ title: newItemTitle })
      .expect(HttpStatus.CREATED)
      .expect({
        id: 6,
        title: newItemTitle,
      });
  });

  test('/item/:id (PUT)', () => {
    const itemToUpdateData: Item = {
      id: 2,
      title: 'The new two',
    };

    return request(application.getHttpServer())
      .put('/item')
      .send(itemToUpdateData)
      .expect(HttpStatus.OK)
      .expect(itemToUpdateData);
  });

  test('/item/:id (DELETE)', () => {
    const idOfItemToDelete = 2;

    return request(application.getHttpServer())
      .delete(`/item/${idOfItemToDelete}`)
      .expect(HttpStatus.OK)
      .expect({
        success: true,
      });
  });
});
