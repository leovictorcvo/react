import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangedTheTypeOfColumnValueOfTransaction1587465506683
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE transactions ALTER COLUMN value TYPE NUMERIC (10,2)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE transactions ALTER COLUMN value TYPE INTEGER',
    );
  }
}
