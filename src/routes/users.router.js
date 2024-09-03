import express from "express";
import { Router } from "express";
import { userModel } from "../models/users.model.js";
import mongoosePaginate from "mongoose-paginate-v2"


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


router.get("/",auth, async (req,res) => {
    const users = await userModel.paginate({gender: "Female"}, {limit: 20, page: 1}) //divide de a 20 por pagina
    console.log(users)
    res.send({status: "success", payload: users});
})

router.post("/", async (req,res) => {
    try{
        const {body} = req //la informacion de un formulario viaja en el body
        if (!body.first_name || !body.email)
        {
            return res.status(400).send({status: "error", error: "falta data"})
        }
        //user.push({id: user.length + 1, ...body})
        const result = await userModel.create(body) //crea un usuario
        
        res.status(200).send({data: result});
    }catch(error){
        console.error(error)
    }
})

router.put("/:uid", async (req,res) => {
    const {uid} = req.params

    let userToReplace = req.body

    if (!userToReplace.first_name || !userToReplace.email)
        {
            return res.status(400).send({status: "error", error: "falta data"})
        }

    const result = await userModel.updateOne({_id: uid}, userToReplace)

    res.send({status: "success", message: "usuario actualizado"});
})

//eliminando un usuerio por id
router.delete("/:uid", async (req,res) => {
    const {uid} = req.params
    const result = await userModel.deleteOne({_id: uid})
    res.send({status: "success", message: "usuario eliminado"});
})

export default router;