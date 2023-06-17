import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database:
        process.env.NODE_ENV === 'test'
          ? 'test-database.sqlite'
          : 'database.sqlite',
      autoLoadEntities: true,
      logging: true,
      synchronize: process.env.NODE_ENV === 'test',
    }),
  ],
})
export class DatabaseModule {}
