module.exports = {
  type: process.env.APP_DB_TYPE,
  host: process.env.APP_DB_HOST,
  port: process.env.APP_DB_PORT,
  username: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  database: process.env.APP_DB_DATABASE,
  synchronize: false,
  // "logging": true,
  logger: "file",
  entities: ["./src/modules/**/typeorm/entities/*.{js,ts}"],
  migrations: ["./src/shared/typeorm/migrations/*.{js,ts}"],
  cli: {
    migrationsDir: "./src/shared/typeorm/migrations",
  },
};
