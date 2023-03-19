import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateKycStatusColumnValues1665729461334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "account" SET "kycStatus"='submitted' WHERE "isKycCompleted"=true`);
    await queryRunner.query(`UPDATE "account" SET "kycStatus"='open' WHERE "isKycCompleted"=false`);
    await queryRunner.query(
      `UPDATE "account" SET "kycStatus"='completed'
      FROM (SELECT id FROM "user" WHERE "apiKey" IS NOT NULL) AS u WHERE u.id = "userId";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "account" SET "kycStatus"='open'`);
  }
}
