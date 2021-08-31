module.exports = {
  type: process.env.TYPEORM_DB_TYPE,
  host: process.env.TYPEORM_DB_HOST,
  port: process.env.TYPEORM_DB_PORT,
  username: process.env.TYPEORM_DB_USERNAME,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true" ? true : false,

  /* Log settings */
  logging: process.env.TYPEORM_LOGGING === "true" ? true : false,
  logger: "file",

  /* Set true for testings */
  dropSchema: process.env.TYPEORM_DROP_SCHEMA === "true" ? true : false,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true" ? true : false,

  entities: ["./src/modules/**/typeorm/entities/*.{js,ts}"],
  migrations: ["./src/shared/typeorm/migrations/*.{js,ts}"],
  cli: {
    migrationsDir: "./src/shared/typeorm/migrations",
  },
};
