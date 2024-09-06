import express from "express";
import { Router } from "express";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";

const router = Router();

const productService = new ProductsManagerFs();

//configuracion

router.get("/", async (req,res) => {
    try{
        const {limit = 10, page = 1, query ="",sort} = req.query
        const limitInt = parseInt(limit)
        const pageInt = parseInt(page)
        let filter = {}
        if(query){
            filter={type:query}
        }
        let products = await productService.getProducts({});
        if(sort==="asc"){
            products = products.sort((a,b)=> a.price - b.price)
        }else if (sort==="desc"){
            products = products.sort((a,b)=> b.price - a.price)
        }
        const startIndex = (pageInt - 1)* limitInt
        const endIndex = pageInt * limitInt
        const paginatedProducts = products.slice(startIndex,endIndex)
        res.send({status: "success", data: paginatedProducts, page:pageInt, limit: limitInt, total: products.length})
    }catch(error){
        console.error(error)
        res.status(500).send({status: "error", message: "Hubo un error al obtener los productos"})
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