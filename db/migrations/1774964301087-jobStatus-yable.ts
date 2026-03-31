import { MigrationInterface, QueryRunner } from "typeorm";

export class JobStatusYable1774964301087 implements MigrationInterface {
    name = 'JobStatusYable1774964301087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ADD "applicationsCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "acceptedCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "acceptedCount"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "applicationsCount"`);
    }

}
