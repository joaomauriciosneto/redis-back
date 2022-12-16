import { DataSource } from "typeorm";
import 'dotenv/config';

export default new DataSource({

  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  ssl:{
    rejectUnauthorized: false
  },
  schema: 'tasks',
  entities: ["src/app/shared/entities/**/*.ts"],
  migrations: ["src/app/shared/migrations/**/*.ts"]

})