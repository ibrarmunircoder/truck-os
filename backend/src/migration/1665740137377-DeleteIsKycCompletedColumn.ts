import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DeleteIsKycCompletedColumn1665740137377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'isKycCompleted');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'isKycCompleted',
        type: 'boolean',
        default: false,
      }),
    );
  }
}
