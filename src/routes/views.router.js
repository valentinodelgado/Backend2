import { Router } from "express";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";

const router = Router();
const productService = new ProductsManagerFs();

router.get("/", async (req, res) => {
    try{
        const products = await productService.getProducts()
        res.render("home", {products});
    }catch(error){
        console.error(error)
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try{
        res.render("realTimeProducts", {})
    }catch(error){
        console.error(error)
    }

});

export default router;
