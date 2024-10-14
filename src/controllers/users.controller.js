import {respuesta} from "../utils/reutilizable.js"
import {createHash, isValidPassword} from "../utils/util.js"
import jwt from "jsonwebtoken"
import UserManager from "../managers/FileSystem/user.managers.js";
import UserDto from "../dto/user.dto.js";

const userService = new UserManager() 

class UserController{
    async register(req,res){
        const {user, password, email, age, last_name} = req.body

        try {
            const userData = {user, password, email, age, last_name}
            await userService.registerUser(userData)
            
            const token = jwt.sign({user: userData.user}, "coderhouse", {expiresIn: "1h"})
    
            res.cookie("coderCookieToken", token, {
                maxAge: 360000,
                httpOnly: true
            })
    
            res.redirect("/api/sessions/current")
    
        } catch (error) {
            respuesta(res,500,"Error interno del servidor")
        }
    }

    async login(req,res){
        const {user, password} = req.body 

        try {
            const userFound = await userService.loginUser(user,password)

            const token = jwt.sign({user: userFound.user, role: userFound.role, email: userFound.email},"coderhouse", {expiresIn: "1h"})

            res.cookie("coderCookieToken", token,{
                maxAge: 360000,
                httpOnly: true
            })

            res.redirect("/api/sessions/current")
        } catch (error) {
            console.error(error)
            respuesta(res,500,"Eror interno del servidor")
        }
        }
        
        async logout(req,res){
            try {
                res.clearCookie("coderCookieToken")
                res.redirect("/api/sessions/login")
            } catch (error) {
                respuesta(res,500,"Error interno")
            }
        }

        async renderLogin(req,res){
            res.render("login");
        }

        async renderRegister(req,res){
            res.render("register");
        }

        async current(req,res){
            console.log(req.user)
            const userDto = new UserDto(req.user)
            res.render("home", {user: userDto})
        }
}

export default UserController