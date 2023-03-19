import { DebtorStatusEnum } from 'src/factoring/enums';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDebtorStatusColumn1666591315565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'debtor',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: Object.values(DebtorStatusEnum),
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('debtor', 'status');
  }
}
