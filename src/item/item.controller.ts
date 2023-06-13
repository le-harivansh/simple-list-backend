import { Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller()
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
    ) {}

    @Get('')
    public index() {
        return this.itemService.findAll();
    }

    @Get('create')
    public create() {
        this.itemService.create('AN ITEM');
    }
}
