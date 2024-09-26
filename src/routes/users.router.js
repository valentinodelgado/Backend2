import express from "express";
import { Router } from "express";
import { userModel } from "../models/users.model.js";
import { cartModel } from "../models/carts.model.js";
import mongoosePaginate from "mongoose-paginate-v2"
import {createHash, isValidPassword} from "../utils/util.js"
import passport from "passport";
import jwt from "jsonwebtoken"
import CartManagerFs from "../managers/FileSystem/carts.managers.js";

const cartService = new CartManagerFs()


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

router.get("/register", async (req, res) => {
    res.render("register"); // Renderiza la vista del formulario de registro
});

router.post("/register", async (req,res) => {
    const {user, password, email, age, last_name} = req.body

    try {
        const userExists = await userModel.findOne({user})

        if(userExists){
            return res.status(400).send("El usuario ya existe")
        }

        const newCart = await cartModel.create({products: []})
        if (!newCart) {
            console.error("Error: El carrito no fue creado correctamente.");
            return res.status(500).send("Error creando el carrito");
        }


        const newUser = new userModel({
            user,
            email,
            last_name,
            age,
            cartId: newCart._id,
            password: createHash(password)
        })
        console.log(newCart._id)
        await newUser.save()

        const token = jwt.sign({user: newUser.user}, "coderhouse", {expiresIn: "1h"})

        res.cookie("coderCookieToken", token, {
            maxAge: 360000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current")

    } catch (error) {
        console.error(error)
        res.status(500).send("Error interno del servidor")
    }
})  

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.post("/login", async(req,res) => {
    const {user, password} = req.body 

    try {
        const userFound = await userModel.findOne({user})

        if(!userFound){
            return res.status(401).send("Usuario no registrado").redirect("/register");
        }

        if(!isValidPassword(password, userFound)){
            return res.status(401).send("Contraseña incorrecta")
        }

        const token = jwt.sign({user: userFound.user, rol: userFound.rol},"coderhouse", {expiresIn: "1h"})

        res.cookie("coderCookieToken", token,{
            maxAge: 360000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current")
    } catch (error) {
        console.error(error)
        res.status(500).send("Error interno del servidor")
    }
})

router.post("/logout", (req,res) => {
    res.clearCookie("coderCookieToken")
    res.redirect("/api/sessions/login")
})

router.get("/current", passport.authenticate("current", {session: false}), (req,res) => {
    res.render("home", {user: req.user.user})
})

export default router;