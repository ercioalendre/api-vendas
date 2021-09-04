const appMode = process.env.APP_MODE === "prod" ? "build" : "dev";
const dropSchema = process.env.TYPEORM_DROP_SCHEMA === "true" ? true : false;
const migrationsRun = process.env.TYPEORM_MIGRATIONS_RUN === "true" ? true : false;
const logging = process.env.TYPEORM_LOGGING === "true" ? true : false;
const synchronize = process.env.TYPEORM_SYNCHRONIZE === "true" ? true : false;

module.exports = {
  type: process.env.TYPEORM_DB_TYPE,
  host: process.env.TYPEORM_DB_HOST,
  port: process.env.TYPEORM_DB_PORT,
  username: process.env.TYPEORM_DB_USERNAME,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_DATABASE,
  synchronize,

  /* Log settings */
  logging,
  logger: "file",

  /* Set true for testings */
  dropSchema,
  migrationsRun,

  entities: [`./${appMode}/modules/**/typeorm/entities/*.{js,ts}`],
  migrations: [`./${appMode}/shared/typeorm/migrations/*.{js,ts}`],
  cli: {
    migrationsDir: `./${appMode}/shared/typeorm/migrations`,
  },
};
