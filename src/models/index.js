import {Sequelize} from 'sequelize';
import {dbConfig} from '../config/config.js';

const sequelize = new Sequelize (
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.DIALECT,
        pool: dbConfig.POOL,
        logging: false, // Disable logging;

    },
);


//Test
sequelize.authenticate()
.then(() => {
    console.log('🐘 Database connected...');
})
.catch((err) => {
    console.error('❌ PostgreSQL connection failed:', err);
});

export default sequelize;