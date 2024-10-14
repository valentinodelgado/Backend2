import { Router } from "express";
import { userModel } from "../models/users.model.js";
import { cartModel } from "../models/carts.model.js";
import passport from "passport";
import UserController from "../controllers/users.controller.js";



const router = Router();

const userController = new UserController()


router.get("/register", userController.renderRegister);
router.post("/register", userController.register)  
router.get("/login", userController.renderLogin);
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/current", passport.authenticate("current", {session: false}), userController.current)

export default router;