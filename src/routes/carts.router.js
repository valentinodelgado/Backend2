import express from "express";
import { Router } from "express";
import CartManagerFs from "../managers/FileSystem/carts.managers.js";

const router = Router();

const cartService = new CartManagerFs();

router.get("/:cid", async (req,res) => {
    try{
        const {cid} = req.params
        const products = await cartService.getCartById(cid)
        res.send({status: "success", data: products})
    }catch(error){
        console.error(error)
    }
})

router.post("/:cid/product/:pid", async (req,res) => {
    try{
        const {cid, pid} = req.params
        const response = await cartService.createProductToCart(pid,cid)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

router.post("/", async (req,res) => {
    try{
        const {body} = req
        const response = await cartService.createCart(body)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

export default router

