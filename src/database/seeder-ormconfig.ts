import { APPLICATION_DATABASE } from "./constants";

export default {
  type: 'better-sqlite3',
  database: APPLICATION_DATABASE,
  entities: ['src/**/*.entity.ts'],
};
