/**
 * The configuration in this file is used for the migration of the database.
 */

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'better-sqlite3',
  database: 'database.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
