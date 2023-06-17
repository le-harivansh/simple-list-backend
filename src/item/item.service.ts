import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll() {
    return this.itemsRepository.find();
  }

  find(id: number) {
    return this.itemsRepository.findOneByOrFail({ id });
  }

  create(title: string) {
    const item = new Item();

    item.title = title;

    return this.itemsRepository.save(item);
  }

  async update(id: number, title: string) {
    const item = await this.itemsRepository.findOneByOrFail({ id });

    item.title = title;

    return this.itemsRepository.save(item);
  }

  async delete(id: number) {
    return !!(await this.itemsRepository.delete(id)).affected;
  }
}
