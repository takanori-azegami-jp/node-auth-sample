import "reflect-metadata";
import { DataSource } from "typeorm";

//DataSourceをインスタンス化
//DataSourceのオプションを設定
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "db",
  synchronize: true,
  logging: false,
  entities: ["./src/entity/*.ts"],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
});
