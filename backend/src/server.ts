import express from 'express';

const app = express();

app.use(express.json());
//Rota
//Recurso = Users
//Methodos HTTP = GET, POST, PUT, DELETE
//Parametros
// GET = buscar info
// POST = Criando novo
// PUT = Editar info
// DELETE = delete info

//localhost:333/users?search=diego

app.get('/location/:lat/:lon', (request, response) => {
    //console.log(request.query); "url?search"
    console.log(request.params); "url/:lat"
    //console.log(request.body); "json/multipart form"
    return response.json({ message: 'Hello word' })
})

app.listen(3333);