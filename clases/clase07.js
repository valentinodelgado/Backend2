//Primer hola mundo desde el backend
//const http = require("http");

//const server = http.createServer((request, response) => {
//    response.end("Mi primer hola mundo");
//})

//server.listen(8080, () =>{
//    console.log("escuchando en puerto 8080");
//}); //donde debe escuchar el servidor, en que puerto en este caso 8080

//utilizando express
//primero hacemos npm init -y
//segundo npm install express
//agregamos "type": "module", al package.json

import express from "express";

const app = express();

app.get("/bienvenida",(req,res) => {
    res.send(`<h1 style="color: blue">Bienvenido al sitio</h1>`); // send envia la respuesta
});   //el get dice si vamos a obtener desde una ruta un parametro en particular

app.get("/usuario", (req,res) => {
    const usuario = {
        nombre: "Valentino",
        apellido: "Delgado",
        edad: 33,
        email: "Holasoyyo@gmail.com"
    }
    res.send({usuario});
})

//app.listen(8080, () => {
//    console.log("Servidor en puerto 8080");
//});

//Objeto request 
//req.params
//Se utiliza cuando necesitamos obtener elementos dinámicos desde la ruta que está llamando el cliente. 
//Para poder definir un “parámetro” dentro de la ruta a trabajar, basta con colocar el símbolo de dos puntos : antes del parámetro 

//app.get("/usuario/:nombre", (req,res) => {
//    console.log(req.params.nombre);
//    res.send(`Bienvenido ${req.params.nombre}`);
//}) //pasamos nuestro nombre por paramtero en el buscador

app.listen(8080, () => {
    console.log("Hola");
})

const usuarios = [
    {id: "1", nombre:"Chelo", apellido: "Delgado", edad: 19},
    {id: "2", nombre:"Tyrion", apellido: "Lanister", edad: 29},
    {id: "3", nombre:"Ned", apellido: "Stark", edad: 30},
]

app.get("/", (req,res) => {
    res.send({usuarios});
});

app.get("/usuario/:id", (req,res) => {
    const userId = req.params.id;
    const user = usuarios.find(usuario => usuario.id === userId); //find busca si esta o no el usuario
    if(!user)
    {
        return res.send({error: "Usuario no encontrado"});
    }
    res.send({user})
});


//req.query

//Como su nombre lo indica, query refiere a las múltiples consultas que se pueden hacer a un determinado endpoint
//basta conque en la url coloquemos el símbolo ? , entonces express reconocerá que hay que meter información al objeto req.query para poder utilizarlo en el endpoint.
//Cuando buscamos algo en nuestro navegador, llamamos a un endpoint haciendo un determinado query.

app.use(express.urlencoded({extended: true})); //sirve para que reconozcan url extendidas y con signos como ? y &

app.get("/queries", (req, res) => {
    const queries = req.query;
    res.send(queries);
});

//se suelen usar para hacer filtros, ej filtrar peliculas por genero 

const peliculas = [
    {titulo: "El conjuro", gender: "terror", duracion: "1.5hs",id: "1"},
    {titulo: "Star Wars", gender: "accion", duracion: "2.5hs",id: "2"},
    {titulo: "Harry potter", gender: "fantasia", duracion: "2hs",id: "3"},
]

app.get("/pelicula/:gender" , (req,res) => {
    const genero = req.params.gender;
    if(!genero){
        return res.send({peliculas});
    }
    const generosFiltrados = peliculas.filter(pelicula => pelicula.gender === genero);
    res.send({peliculas: generosFiltrados});
})

app.get("/pelicula_query" , (req,res) => {
    const genero = req.query.gender;
    if(!genero){
        return res.send({peliculas});
    }
    const generosFiltrados = peliculas.filter(pelicula => pelicula.gender === genero);
    res.send({peliculas: generosFiltrados});
})
