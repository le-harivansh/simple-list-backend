import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(applicationConfig),
    TypeOrmModule.forRoot(dataSourceOptions),
    ItemModule,
  ],
})
export class ApplicationModule {}
