import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APPLICATION_DATABASE, TEST_DATABASE } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database:
        process.env.NODE_ENV === 'test' ? TEST_DATABASE : APPLICATION_DATABASE,
      autoLoadEntities: true,
      logging: true,
      synchronize: process.env.NODE_ENV === 'test',
    }),
  ],
})
export class DatabaseModule {}
