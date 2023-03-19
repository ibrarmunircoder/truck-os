import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDebtorPriorityColumn1666596749356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "debtor" SET "priority"=0 WHERE "status" IN ('EXPIRED','DISABLED','DISABLED_BY_WALBING')`,
    );
    await queryRunner.query(`UPDATE "debtor" SET "priority"=1 WHERE "status" IN ('CREATED','IN_REVIEW')`);
    await queryRunner.query(`UPDATE "debtor" SET "priority"=2 WHERE "status" IN ('VERIFIED','REGISTERED')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "debtor" SET "priority"=NULL`);
  }
}
