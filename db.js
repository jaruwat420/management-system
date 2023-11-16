import {createPool} from 'mysql2/promise';
import dotenv from 'dotenv'; 
dotenv.config({ path: './.env'})

export const pool = createPool({
    host: 'process.env.DATABASE_NAME',
    user: 'process.env.DATABASE_USER',
    password: 'process.env.DATABASE_PASSWORD',
    port: 'process.env.DATABASE_PORT',
    database: 'process.env.DATABASE_NAME',
});