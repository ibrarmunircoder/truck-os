import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderPriorityColumn1666597640137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "order" SET "priority"=0 WHERE "status" IN ('DECLINED','SELLING_CANCELED','SELLING_ENDED_WITHOUT_BUYER','EXPIRED','REVOKED','NOT_ALLOWED')`,
    );
    await queryRunner.query(`UPDATE "order" SET "priority"=1 WHERE "draft"=true`);
    await queryRunner.query(
      `UPDATE "order" SET "priority"=2 WHERE "status" IN ('IN_VERIFICATION','READY_FOR_SALE','SELLING_SCHEDULED','SELLING_IN_PROGRESS')`,
    );
    await queryRunner.query(
      `UPDATE "order" SET "priority"=3 WHERE "status" IN ('IN_SETTLEMENT','IN_COLLECTION','SETTLED')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "order" SET "priority"=NULL`);
  }
}
