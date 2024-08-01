import express from "express";
import { Router } from "express";

//metodo estatico: son las que no necesito instanciar, las que no necesito crear un objeto

const router = Router();

//ejemplo de middleware a nivel ruta, no permite avanzar si no sos admin
function auth(req, res, next){
    req.user = {
        name: "fede",
        role:"admin"
    }
    if(req.user.role != "admin"){
        return res.send("no puede avanzar a partir de aqui")
    }
    next();
}

const user = [];

router.get("/",auth, (req,res) => {
    res.send({data: user});
})

router.post("/", (req,res) => {
    const {body} = req //la informacion de un formulario viaja en el body
    user.push({id: user.length + 1, ...body})
    res.send({data: user});
})

router.put("/", (req,res) => {
    res.send("Hola mundo put");
})

//eliminando un usuerio por id
router.delete("/:uid", (req,res) => {
    const {uid} = req.params
    const nuevaLista = user.filter(user => user.id != parseInt(uid))
    res.send(nuevaLista);
})

export default router;