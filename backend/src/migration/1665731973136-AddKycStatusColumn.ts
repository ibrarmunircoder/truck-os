import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddKycStatusColumn1665725054499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'kycStatus',
        type: 'enum',
        isNullable: true,
        enum: ['open', 'submitted', 'postident', 'completed'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'kycStatus');
  }
}
