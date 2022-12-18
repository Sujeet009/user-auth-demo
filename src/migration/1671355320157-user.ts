import { MigrationInterface, QueryRunner } from "typeorm"

export class user1671355320157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users (
            id serial NOT NULL PRIMARY KEY,
            name VARCHAR  NOT NULL,
            password VARCHAR  NOT NULL,
            email VARCHAR UNIQUE NOT NULL UNIQUE,
            role VARCHAR NOT NULL,
            created_at TIMESTAMP NOT NULL  DEFAULT now(),
            update_at TIMESTAMP NOT NULL  DEFAULT now()
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
