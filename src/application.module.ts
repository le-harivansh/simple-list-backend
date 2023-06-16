import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './application.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(applicationConfig),
    DatabaseModule,
    ItemModule,
  ],
})
export class ApplicationModule {}
