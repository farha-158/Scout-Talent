import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTable1773683319531 implements MigrationInterface {
    name = 'AddNewTable1773683319531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobOffer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "offeredSalary" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "applicationId" uuid, CONSTRAINT "REL_3ef8642da65cce502da7550121" UNIQUE ("applicationId"), CONSTRAINT "PK_24d6aeb541b4ceffed3ca8e2b0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hiredDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "applicationId" uuid, CONSTRAINT "REL_6810b7bcf49a32fad3dacab772" UNIQUE ("applicationId"), CONSTRAINT "PK_58e69d2d78ddda9f7c54e09e669" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."interviews_type_enum" AS ENUM('Technical', 'HR', 'Final')`);
        await queryRunner.query(`CREATE TABLE "interviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."interviews_type_enum" NOT NULL DEFAULT 'Technical', "scheduledAt" TIMESTAMP NOT NULL, "meetingLink" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "applicationId" uuid, CONSTRAINT "PK_fd41af1f96d698fa33c2f070f47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job_applicant" ADD "screenAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "job_applicant" ADD "sendOfferAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "job_applicant" ADD "interviewAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "job_applicant" ADD "rejectAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "jobOffer" ADD CONSTRAINT "FK_3ef8642da65cce502da75501219" FOREIGN KEY ("applicationId") REFERENCES "job_applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hiredDetails" ADD CONSTRAINT "FK_6810b7bcf49a32fad3dacab7729" FOREIGN KEY ("applicationId") REFERENCES "job_applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_ba82c76bf124871821aedc35b7a" FOREIGN KEY ("applicationId") REFERENCES "job_applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_ba82c76bf124871821aedc35b7a"`);
        await queryRunner.query(`ALTER TABLE "hiredDetails" DROP CONSTRAINT "FK_6810b7bcf49a32fad3dacab7729"`);
        await queryRunner.query(`ALTER TABLE "jobOffer" DROP CONSTRAINT "FK_3ef8642da65cce502da75501219"`);
        await queryRunner.query(`ALTER TABLE "job_applicant" DROP COLUMN "rejectAt"`);
        await queryRunner.query(`ALTER TABLE "job_applicant" DROP COLUMN "interviewAt"`);
        await queryRunner.query(`ALTER TABLE "job_applicant" DROP COLUMN "sendOfferAt"`);
        await queryRunner.query(`ALTER TABLE "job_applicant" DROP COLUMN "screenAt"`);
        await queryRunner.query(`DROP TABLE "interviews"`);
        await queryRunner.query(`DROP TYPE "public"."interviews_type_enum"`);
        await queryRunner.query(`DROP TABLE "hiredDetails"`);
        await queryRunner.query(`DROP TABLE "jobOffer"`);
    }

}
