import { MigrationInterface, QueryRunner } from "typeorm";

export class OutboxUsertokenTables1774943292147 implements MigrationInterface {
    name = 'OutboxUsertokenTables1774943292147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user-token_type_enum" AS ENUM('VERIFY_EMAIL', 'RESET_PASSWORD', 'RESTORE_ACCOUNT')`);
        await queryRunner.query(`CREATE TABLE "user-token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "type" "public"."user-token_type_enum" NOT NULL, "userId" uuid, CONSTRAINT "UQ_8f5675e6be7fb584a04b6e26ca8" UNIQUE ("token"), CONSTRAINT "PK_ce0bc8c9c3bac40b0301e8e1165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."outbox_event_type_enum" AS ENUM('SEND_VERIFICATION_EMAIL', 'SEND_RESET_PASSWORD', 'SEND_RESORE_EMAIL')`);
        await queryRunner.query(`CREATE TYPE "public"."outbox_status_enum" AS ENUM('PENDING', 'SENT', 'FAILED', 'PROCESSING')`);
        await queryRunner.query(`CREATE TABLE "outbox" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type" "public"."outbox_event_type_enum" NOT NULL, "payload" jsonb NOT NULL, "status" "public"."outbox_status_enum" NOT NULL DEFAULT 'PENDING', "retryCount" integer NOT NULL DEFAULT '0', "nextRetryAt" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_340ab539f309f03bdaa14aa7649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAccountVerified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetPasswordToken"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isDelete" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user-token" ADD CONSTRAINT "FK_6c43c95ddb18b3ae863e7c9d06e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-token" DROP CONSTRAINT "FK_6c43c95ddb18b3ae863e7c9d06e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDelete"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailVerified"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resetPasswordToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAccountVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "outbox"`);
        await queryRunner.query(`DROP TYPE "public"."outbox_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."outbox_event_type_enum"`);
        await queryRunner.query(`DROP TABLE "user-token"`);
        await queryRunner.query(`DROP TYPE "public"."user-token_type_enum"`);
    }

}
