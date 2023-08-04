import { DataSource } from 'typeorm';
import { APPLICATION_DATABASE } from './constants';

export default new DataSource({
  type: 'better-sqlite3',
  database: APPLICATION_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
});
