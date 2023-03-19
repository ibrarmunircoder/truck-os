import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDebtorPriorityColumn1666596510210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'debtor',
      new TableColumn({
        name: 'priority',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('debtor', 'priority');
  }
}
