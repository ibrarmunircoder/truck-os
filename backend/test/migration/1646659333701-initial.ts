import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1646659333701 implements MigrationInterface {
  name = 'initial1646659333701'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS "public"."event_subscriber";
        CREATE TABLE "public"."event_subscriber" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "eventType" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "consumer" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "createdAt" timestamp(6) NOT NULL DEFAULT now(),
          "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
          "condition" varchar COLLATE "pg_catalog"."default",
          "parameters" jsonb,
          "api" varchar COLLATE "pg_catalog"."default"
        );
      `,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "public"."event_type";
        CREATE TABLE "public"."event_type" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "eventType" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "createdAt" timestamp(6) NOT NULL DEFAULT now(),
          "updatedAt" timestamp(6) NOT NULL DEFAULT now()
        );
      `,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "public"."user";
        CREATE TABLE "public"."user" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "password" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "phone" varchar COLLATE "pg_catalog"."default",
          "firstName" varchar COLLATE "pg_catalog"."default",
          "lastName" varchar COLLATE "pg_catalog"."default",
          "locale" varchar COLLATE "pg_catalog"."default",
          "timezone" varchar COLLATE "pg_catalog"."default",
          "roqIdentifier" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "optedInAt" timestamp(6),
          "active" bool DEFAULT true,
          "sync" bool DEFAULT false,
          "createdAt" timestamp(6) NOT NULL DEFAULT now(),
          "updatedAt" timestamp(6) NOT NULL DEFAULT now()
        );
      `,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "public"."user_login_history";
        CREATE TABLE "public"."user_login_history" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "ip" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "host" varchar COLLATE "pg_catalog"."default" NOT NULL,
          "timestamp" timestamp(6) NOT NULL,
          "userId" uuid NOT NULL,
          "createdAt" timestamp(6) NOT NULL DEFAULT now(),
          "updatedAt" timestamp(6) NOT NULL DEFAULT now()
        );
      `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."event_subscriber" ADD CONSTRAINT "PK_80af3dbae1cbcd05451007f552a" PRIMARY KEY ("id");
        ALTER TABLE "public"."event_type" ADD CONSTRAINT "PK_d968f34984d7d85d96f782872fe" PRIMARY KEY ("id");
        ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_7ad433b15af1fe9e78e65183c92" UNIQUE ("roqIdentifier");
        ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email");
        ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id");
        ALTER TABLE "public"."user_login_history" ADD CONSTRAINT "PK_cc6cb18451f716b40ed6cd898b1" PRIMARY KEY ("id");
        ALTER TABLE "public"."user_login_history" ADD CONSTRAINT "FK_8cd045e34dacf6e82ac34e783b5" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
        ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_7ad433b15af1fe9e78e65183c92";
        DROP INDEX "UQ_e12875dfb3b1d92d7d7c5377e22";
        ALTER TABLE "public"."user_login_history" DROP CONSTRAINT "FK_8cd045e34dacf6e82ac34e783b5";
        DROP TABLE "public"."event_type";
        DROP TABLE "public"."event_subscriber";
        DROP TABLE "public"."user_login_history";
        DROP TABLE "public"."user";
      `,
    )
  }
}
