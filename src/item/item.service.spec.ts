import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

describe('ItemService', () => {
  const items: Item[] = [
    { id: 1, title: 'One' },
    { id: 2, title: 'Two' },
    { id: 3, title: 'Three' },
    { id: 4, title: 'Four' },
    { id: 5, title: 'Five' },
  ];

  let itemsRepository: Repository<Item>;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Item],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Item]),
      ],
      providers: [ItemService],
    }).compile();

    itemsRepository = module.get(getRepositoryToken(Item));
    itemService = module.get(ItemService);
  });

  beforeEach(async () => {
    for (const item of items) {
      await itemsRepository.insert(item);
    }
  });

  afterEach(async () => {
    await itemsRepository.clear();
  });

  describe('findAll', () => {
    it('retrieves all the items from the table', () => {
      expect(itemService.findAll()).resolves.toEqual(items);
    });
  });

  describe('find', () => {
    it('retrieves the specified item from the table', () => {
      const idOfItemToRetrieve = 3;
      const itemToRetrieve = items.filter(
        ({ id }) => id === idOfItemToRetrieve,
      )[0];

      expect(itemService.find(idOfItemToRetrieve)).resolves.toEqual(
        itemToRetrieve,
      );
    });
  });

  describe('create', () => {
    it('creates an item with the specified title', async () => {
      const newItemTitle = 'A new item';
      const newlyCreatedItem = await itemService.create(newItemTitle);
      const newItemExists = await itemsRepository.exist({
        where: { title: newItemTitle },
      });

      expect(newlyCreatedItem.title).toBe(newItemTitle);
      expect(newItemExists).toBe(true);
    });
  });

  describe('update', () => {
    it('updates an item', async () => {
      const expectedUpdatedItem: Item = {
        id: 5,
        title: 'This is the new five',
      };

      const updateOperationResult = await itemService.update(
        expectedUpdatedItem.id,
        expectedUpdatedItem.title,
      );
      const updatedItem = await itemsRepository.findOneBy({
        id: expectedUpdatedItem.id,
      });

      expect(updateOperationResult).toEqual(expectedUpdatedItem);
      expect(updatedItem).toEqual(expectedUpdatedItem);
    });
  });

  describe('delete', () => {
    it('deletes an item', async () => {
      const idOfItemToDelete = 4;
      const deleteOperationResult = await itemService.delete(idOfItemToDelete);
      const deletedItemExists = await itemsRepository.exist({
        where: { id: idOfItemToDelete },
      });

      expect(deleteOperationResult).toBe(true);
      expect(deletedItemExists).toBe(false);
    });
  });
});
