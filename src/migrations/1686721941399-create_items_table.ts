import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemsTable1686721941399 implements MigrationInterface {
    name = 'CreateItemsTable1686721941399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
