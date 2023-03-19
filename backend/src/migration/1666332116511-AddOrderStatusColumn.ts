import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

enum ReceivableStatusEnum {
  IN_VERIFICATION = 'IN_VERIFICATION',
  DECLINED = 'DECLINED',
  READY_FOR_SALE = 'READY_FOR_SALE',
  SELLING_SCHEDULED = 'SELLING_SCHEDULED',
  SELLING_IN_PROGRESS = 'SELLING_IN_PROGRESS',
  SELLING_CANCELED = 'SELLING_CANCELED',
  SELLING_ENDED_WITHOUT_BUYER = 'SELLING_ENDED_WITHOUT_BUYER',
  IN_SETTLEMENT = 'IN_SETTLEMENT',
  IN_COLLECTION = 'IN_COLLECTION',
  UNPAID = 'UNPAID',
  SETTLED = 'SETTLED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  NOT_ALLOWED = 'NOT_ALLOWED',
}

export class AddOrderStatusColumn1666332116511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'status',
        type: 'enum',
        isNullable: true,
        enum: Object.values(ReceivableStatusEnum),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order', 'status');
  }
}
