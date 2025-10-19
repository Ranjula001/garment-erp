import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const dbConfig = {
    HOST : process.env.DB_HOST,
    USER : process.env.DB_USER,
    PASSWORD : process.env.DB_PASS,
    DB : process.env.DB_NAME,
    DIALECT : process.env.DB_DIALECT,
    PORT : process.env.DB_PORT,
    POOL : { //connection pooling settings
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}