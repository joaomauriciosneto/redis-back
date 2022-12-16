import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimeiraMigration1671142000109 implements MigrationInterface {
    name = 'PrimeiraMigration1671142000109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks"."users" ("idUser" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_65e7c74bbeaca3cb19ae90bf6ee" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`CREATE TABLE "tasks"."note" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "saveNote" boolean NOT NULL, "id_user" character varying, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks"."note" ADD CONSTRAINT "FK_f4f182421a89338bdc432d6adf7" FOREIGN KEY ("id_user") REFERENCES "tasks"."users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks"."note" DROP CONSTRAINT "FK_f4f182421a89338bdc432d6adf7"`);
        await queryRunner.query(`DROP TABLE "tasks"."note"`);
        await queryRunner.query(`DROP TABLE "tasks"."users"`);
    }

}
