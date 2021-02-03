import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import './database';
import errorHandler from './errors/handler';
import routes from './routes';

const app = express();

//require('./database');

// const mysql = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'petapp.mysql.uhserver.com',
//     user     : 'petapp',
//     password : 'Luna604@',
//     database : 'petapp'
//   });
//   connection.connect();

app.use(express.json());
app.use(cors({ origin: 'https://localhost:3000' }));
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);
app.listen(3333);

