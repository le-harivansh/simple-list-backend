import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller()
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
    ) {}

    @Get('items')
    public index() {
        return this.itemService.findAll();
    }

    @Get('item/:id')
    public show(@Param('id') id: number) {
        return this.itemService.find(id)
    }

    @Post('item/create')
    @UsePipes(ValidationPipe)
    public create(@Body() { title }: CreateItemDto) {
        return this.itemService.create(title);
    }

    @Put('item/:id')
    @UsePipes(ValidationPipe)
    public update(
        @Param('id') id: number,
        @Body() { title }: UpdateItemDto,
    ) {
        return this.itemService.update(id, title);
    }

    @Delete('item/:id')
    public async destroy(@Param('id') id: number) {
        const deletionIsSuccessful = await this.itemService.delete(id)

        return {
            success: deletionIsSuccessful
        }
    }
}
