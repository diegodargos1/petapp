import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import LandingStoreController from './controllers/LandingStoreController';
import UserController from './controllers/UserController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.post('/users/login', UserController.index);
routes.post('/users/face', UserController.indexFace);
routes.post('/users/check', UserController.indexCheck);
//routes.post('/stores', StoreController.store);
// routes.post('/stores/location', upload.array('images'), StoreController.store);
// routes.get('/stores/location/:lat/:lon', StoreController.index);
routes.post('/cadastro/stores/:id', upload.array('images'), LandingStoreController.store);
routes.post('/update/stores/', LandingStoreController.update);
routes.get('/listar/stores/:id', upload.array('images'), LandingStoreController.index);


export default routes;










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