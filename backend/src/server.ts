const express = require('express');
const routes = require('./routes');

const app = express();
require('./database');

// const mysql = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'petapp.mysql.uhserver.com',
//     user     : 'petapp',
//     password : 'Luna604@',
//     database : 'petapp'
//   });
//   connection.connect();
app.use(express.json());
app.use(routes);
app.listen(3333);

 