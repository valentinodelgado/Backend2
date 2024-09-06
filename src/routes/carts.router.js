import express from "express";
import { Router } from "express";
import CartManagerFs from "../managers/FileSystem/carts.managers.js";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";


const router = Router();

const cartService = new CartManagerFs();
const productService = new ProductsManagerFs();

router.get("/:cid", async (req,res) => {
    try{
        const {cid} = req.params
        const products = await cartService.getCartById(cid)
        res.render("cart",{products})
    }catch(error){
        console.error(error)
    }
})

router.post("/:cid/product", async (req,res) => {
    try{
        const {cid} = req.params
        const {body} = req
        const response = await cartService.createProductToCart(body,cid)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

router.post("/create", async (req,res) => {
    try{
        const {body} = req
        const response = await cartService.createCart(body)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

router.delete("/:cid/product/:pid", async (req,res) => {
    try{
        const {cid, pid} = req.params
        const response = await cartService.deleteProductFromCart(pid,cid)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

router.delete("/:cid", async (req,res) => {
    try{
        const {cid} = req.params
        const response = await cartService.deleteProductsFromCart(cid)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

router.put("/:cid", async (req,res) => {
    try{
        const {cid} = req.params
        const {body} = req
        const response = await cartService.updateCart(cid,body)

        res.send({status: "success", data: response})

    }catch(error){
        console.error(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const product = await productService.getProductById(pid);

        if (!product) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        const result = await cartService.createProductToCart(product, cid);

        res.send({ message: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al agregar el producto al carrito" });
    }
});



export default router

