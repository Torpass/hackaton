import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from '@sequelize/postgres'
import { envs } from './envs';

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: envs.POSTGRES_DB,
    user: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    host: envs.DATABASE_URL,
  });

const initDb = async () => {
    try{
        await sequelize.authenticate();
        console.log('Postgres conectado');
    }catch(e){
        console.log(e);
        throw new Error('Error al conectar a la base de datos');
    }
};

export {sequelize, initDb}
