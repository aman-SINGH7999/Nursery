import { Sequelize } from 'sequelize'
import dotenv from "dotenv";

dotenv.config();

const database_name = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USER_NAME;
const password = process.env.DATABASE_PASSWORD;
const server = process.env.DATABASE_SERVER;
const port = process.env.DATABASE_PORT;


const sequelize = new Sequelize(database_name, username, password, {
  host: server,
  port: port,
  dialect: 'postgres',
  logging: false,
});

console.log("NODE_ENV =", process.env.NODE_ENV);

const dbConnect = async ()=>{
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      if(process.env.NODE_ENV === 'development'){
        await sequelize.sync({alter:true}) // { force: true }  for reset
        console.log('Models synced with database.');
      }

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

export { dbConnect, sequelize };
