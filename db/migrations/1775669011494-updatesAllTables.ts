import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatesAllTables1775669011494 implements MigrationInterface {
    name = 'UpdatesAllTables1775669011494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274"`);
        await queryRunner.query(`ALTER TABLE "skills" DROP CONSTRAINT "FK_ba4845b5f720bc463a8d673a120"`);
        await queryRunner.query(`ALTER TABLE "job_applicant" DROP CONSTRAINT "FK_c78f9fee4defea0110ba5ef0ed0"`);
        await queryRunner.query(`ALTER TABLE "CV" DROP CONSTRAINT "FK_0a4835f22b6d5b52b1ba4ba59d2"`);
        await queryRunner.query(`ALTER TABLE "experience" RENAME COLUMN "userId" TO "applicantId"`);
        await queryRunner.query(`ALTER TABLE "skills" RENAME COLUMN "userORcompanyId" TO "applicantId"`);
        await queryRunner.query(`CREATE TABLE "specialization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_904dfcbdb57f56f5b57b9c09cc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "About" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applicant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying, "job_title" character varying, CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "job_title"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "About"`);
        await queryRunner.query(`ALTER TABLE "specialization" ADD CONSTRAINT "FK_353f54a6f585a07c0f90140797c" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_9c837a4822a45cf6bc4938a1bba" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skills" ADD CONSTRAINT "FK_09ed4d6c331fbfb5a455d868db7" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applicant" ADD CONSTRAINT "FK_c78f9fee4defea0110ba5ef0ed0" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CV" ADD CONSTRAINT "FK_0a4835f22b6d5b52b1ba4ba59d2" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CV" DROP CONSTRAINT "FK_0a4835f22b6d5b52b1ba4ba59d2"`);
        await queryRunner.query(`ALTER TABLE "job_applicant" DROP CONSTRAINT "FK_c78f9fee4defea0110ba5ef0ed0"`);
        await queryRunner.query(`ALTER TABLE "skills" DROP CONSTRAINT "FK_09ed4d6c331fbfb5a455d868db7"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_9c837a4822a45cf6bc4938a1bba"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`);
        await queryRunner.query(`ALTER TABLE "specialization" DROP CONSTRAINT "FK_353f54a6f585a07c0f90140797c"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "About" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "job_title" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
        await queryRunner.query(`DROP TABLE "applicant"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "specialization"`);
        await queryRunner.query(`ALTER TABLE "skills" RENAME COLUMN "applicantId" TO "userORcompanyId"`);
        await queryRunner.query(`ALTER TABLE "experience" RENAME COLUMN "applicantId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "CV" ADD CONSTRAINT "FK_0a4835f22b6d5b52b1ba4ba59d2" FOREIGN KEY ("applicantId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applicant" ADD CONSTRAINT "FK_c78f9fee4defea0110ba5ef0ed0" FOREIGN KEY ("applicantId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skills" ADD CONSTRAINT "FK_ba4845b5f720bc463a8d673a120" FOREIGN KEY ("userORcompanyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
