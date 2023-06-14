import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { dataSourceOptions } from 'src/datasource';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(applicationConfig),
    TypeOrmModule.forRoot(
      // {
      //   type: 'sqlite',
      //   database: `${path.resolve(__dirname, '..')}/database/database.sqlite`,
      //   autoLoadEntities: true,
      //   logging: true,
      // }
      dataSourceOptions
    ),
    ItemModule,
  ],
})
export class ApplicationModule {}
