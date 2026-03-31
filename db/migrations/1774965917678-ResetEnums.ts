import { MigrationInterface, QueryRunner } from "typeorm";

export class ResetEnums1774965917678 implements MigrationInterface {
    name = 'ResetEnums1774965917678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."jobs_status_enum" RENAME TO "jobs_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum" AS ENUM('Draft', 'Published', 'ApplicationsFull', 'Closed', 'Paused', 'Expired', 'Filled')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" TYPE "public"."jobs_status_enum" USING "status"::"text"::"public"."jobs_status_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."outbox_event_type_enum" RENAME TO "outbox_event_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."outbox_event_type_enum" AS ENUM('SEND_VERIFICATION_EMAIL', 'SEND_RESET_PASSWORD', 'SEND_RESTORE_EMAIL')`);
        await queryRunner.query(`ALTER TABLE "outbox" ALTER COLUMN "event_type" TYPE "public"."outbox_event_type_enum" USING "event_type"::"text"::"public"."outbox_event_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."outbox_event_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."outbox_event_type_enum_old" AS ENUM('SEND_VERIFICATION_EMAIL', 'SEND_RESET_PASSWORD', 'SEND_RESORE_EMAIL')`);
        await queryRunner.query(`ALTER TABLE "outbox" ALTER COLUMN "event_type" TYPE "public"."outbox_event_type_enum_old" USING "event_type"::"text"::"public"."outbox_event_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."outbox_event_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."outbox_event_type_enum_old" RENAME TO "outbox_event_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum_old" AS ENUM('Draft', 'Published', 'Closed', 'Paused', 'Expired', 'Filled')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" TYPE "public"."jobs_status_enum_old" USING "status"::"text"::"public"."jobs_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_status_enum_old" RENAME TO "jobs_status_enum"`);
    }

}
