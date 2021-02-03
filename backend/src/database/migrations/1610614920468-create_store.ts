import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStore1610614920468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'store',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                }, {
                    name: 'name',
                    type: 'varchar'
                }, {
                    name: 'rua',
                    type: 'varchar'
                }, {
                    name: 'numero',
                    type: 'varchar'
                }, {
                    name: 'cidade',
                    type: 'varchar'
                }, {
                    name: 'complemento',
                    type: 'varchar'
                }, {
                    name: 'email',
                    type: 'varchar'
                }, {
                    name: 'telefone',
                    type: 'varchar'
                }, {
                    name: 'website',
                    type: 'varchar'
                }, {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 10
                }, {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 10

                }, {
                    name: 'user_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'userId',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: ''
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
