import express from "express";
import { Router } from "express";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";

const router = Router();

const productService = new ProductsManagerFs();

//configuracion

router.get("/", async (req,res) => {
    try{
        const products = await productService.getProducts()
        res.send({status: "success", data: products})
    }catch(error){
        console.error(error)
    }
})

router.get("/:pid", async (req,res) => {
    try{
        const {pid} = req.params
        const product = await productService.getProduct(pid)
        res.send({status: "success", data: product})
    }catch(error){
        console.error(error)
    }
})


router.post("/", async (req,res) => {
    try{
        const {body} = req

        const response = await productService.createProduct(body)
        
        res.send({status: "success", data: response})
    } catch (error){
        console.error(error)
    }
})

router.put("/:pid", async(req,res) => {
    try{
        const {pid} = req.params
        const {body} = req

        const response = await productService.updateProduct(body,pid)

        res.send(response)
    }catch(error){
        console.error(error)
    }
})

router.delete("/:pid", async(req,res) => {
    try{
        const {pid} = req.params

        const response = await productService.deleteProduct(pid)

        res.send(response)
    }catch(error){
        console.error(error)
    }
})

export default router;