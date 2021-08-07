export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  synchronize: false,
  // "logging": true,
  logger: "file",
  entities: ["./src/modules/**/typeorm/entities/*.ts"],
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/shared/typeorm/migrations",
  },
};
