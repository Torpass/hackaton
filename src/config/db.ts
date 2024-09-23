import { Sequelize } from "sequelize";
import { envs } from './envs';

const sequelize = new Sequelize({
    dialect: "postgres",
    database: envs.POSTGRES_DB,
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    host: envs.POSTGRES_HOST,
});


//iniciar db
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
