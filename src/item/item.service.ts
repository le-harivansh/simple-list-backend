import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>
    ) {}

    create(title: string) {
        const item = new Item();

        item.title = title;

        this.itemsRepository.save(item);
    }

    findAll() {
        return this.itemsRepository.find();
    }
}
