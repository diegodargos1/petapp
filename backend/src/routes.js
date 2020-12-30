const express = require('express');

const UserController = require('./controllers/UserController');
const StoreController = require('./controllers/StoreController');
const StoreLocationController = require('./controllers/StoreLocationController');

const routes = express.Router();

routes.post('/users', UserController.store )
routes.post('/stores', StoreController.store )
routes.post('/stores/location', StoreLocationController.store )
routes.get('/stores/location/:lat/:lon', StoreLocationController.index )

module.exports = routes;










//Rota
//Recurso = Users
//Methodos HTTP = GET, POST, PUT, DELETE
//Parametros
// GET = buscar info
// POST = Criando novo
// PUT = Editar info
// DELETE = delete info

//localhost:333/users?search=diego

// app.get('/location/:lat/:lon', (request, response) => {
//     let lat = parseFloat(request.params.lat);
//     let lon = parseFloat(request.params.lon);
//     let result = connection.query(`SELECT * FROM db_store_location WHERE Latitude <= "${lat+0.2}" AND Latitude >= "${-0.1+lat}"
//     AND Longitude >= "${-0.2+lon}" AND Longitude <= "${lon+0.1}"` , 
//     function (error: any, results: { solution: any; }[], fields: any) {
//         if (error) throw error;
//         return results;
//     });
//     console.log(result)
//     connection.end();
    
//     //console.log(request.query); "url?search"
//     //console.log(request.params); "url/:lat"
//     //console.log(request.body); "json/multipart form"
//     return response.json({ message: "`result`" })
// })