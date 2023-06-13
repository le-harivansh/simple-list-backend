import { Controller, Get } from '@nestjs/common';

@Controller()
export class ListController {
    @Get('')
    public index() {
        return ['item 1', 'item 2'];
    }
}
