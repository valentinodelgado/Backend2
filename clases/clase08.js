//Cuando se hace un request al servidor mediante http, el servidor debe respondernos con informacion y con un codigo de estado del proceso
//el req es un objeto, con un header, un body, que viaja a un servidor, el cual procesa y envia una respuesta (response), el cual es otro objeto
//Un post es un formulario, el formulario envia lo que llenamos en los inputs, en resumen el post envia informacion
//Una url se compone de un dominio, un protocolo y el metodo que es un verbo (ej get), la url es parte de un superconjunto llamado uri

//API REST

//Una API funge como un contrato entre el front y el back, son un conjunto de reglas

//REST: la estructura que van a tener los datos para tranferirse (como ddebe ser el cuerpo del mensaje)
//Los 2 formatos mas importantes son JSON y XML

//Uuna APIREST debe ser:

//Cacheable 
//tener Arquitectura Cliente-Servidor sin estado
//Operaciones comunes (Post, get, put y delete)
//Intefraz uniforme (cada accion debe contar con una uri, un identificador unico)
//Utilizacion de hipermedios

//METODOS DE PETICION

//GET: Obtener un recurso
//POST: Crear o añadir un recurso
//PUT: Modificar un recurso
//DELETE: Eliminar un recurso

import express from "express";

const app = express();
const PORT = 8080;

//esto es para poder procesar los json del cliente
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Una callback es una funcion pasada por parametro


const user = [];

app.get("/users", (req,res) => {
    res.send({data: user});
})

app.post("/users", (req,res) => {
    const {body} = req //la informacion de un formulario viaja en el body
    user.push({id: user.length + 1, ...body})
    res.send({data: user});
})

app.put("/users", (req,res) => {
    res.send("Hola mundo put");
})

//eliminando un usuerio por id
app.delete("/users/:uid", (req,res) => {
    const {uid} = req.params
    const nuevaLista = user.filter(user => user.id != parseInt(uid))
    res.send(nuevaLista);
})


app.listen(PORT,() => {
    console.log("Escuchando");
})