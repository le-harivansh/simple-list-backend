import { APPLICATION_DATABASE_NAME } from "./constants";

export default {
  type: 'better-sqlite3',
  database: APPLICATION_DATABASE_NAME,
  entities: ['src/**/*.entity.ts'],
};
