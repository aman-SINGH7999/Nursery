import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { dbConnect } from './src/config/dbConnect.js';
// it must be after sequelize (required for sync)
import './src/models/index.js'

import authRoute from './src/routes/authRoute.js';
import categoryRoute from './src/routes/categoryRoute.js';
import productRoute from './src/routes/productRoute.js';




const app = express();
env.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3001"
  ],
  credentials: true,
}));


app.get('/',(req,res)=>{res.json("Hello World.")});
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);


const port = process.env.PORT || 6001;

app.listen(port, ()=>{
  console.log("Server is running on port: ", port);
  dbConnect();
})