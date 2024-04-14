import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from 'src/entities/Product';
import { User } from 'src/entities/User';

dotenv.config();
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Product, User],
    migrations: [],
    subscribers: []
});
