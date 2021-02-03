import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1610601811702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                }, {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                }, {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                }, {
                    name: 'nome',
                    type: 'varchar',
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
