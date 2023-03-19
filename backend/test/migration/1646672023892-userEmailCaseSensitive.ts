import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmailCaseSensitive1646672023892 implements MigrationInterface {
  name = 'userEmailCaseSensitive1646672023892'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE COLLATION IF NOT EXISTS case_insensitive (provider = icu, locale = 'und-u-ks-level2', deterministic = false);`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "email" type VARCHAR COLLATE "case_insensitive";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "email" type VARCHAR;`);
    await queryRunner.query(`DROP COLLATION IF EXISTS case_insensitive`);
  }
}
