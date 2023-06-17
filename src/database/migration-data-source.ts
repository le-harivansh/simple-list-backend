import { DataSource } from 'typeorm';
import { APPLICATION_DATABASE_NAME } from './constants';

export default new DataSource({
  type: 'better-sqlite3',
  database: APPLICATION_DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
