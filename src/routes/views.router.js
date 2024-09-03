import { Router } from "express";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";
import { productModel } from "../models/products.model.js";

const router = Router();
const productService = new ProductsManagerFs();

router.get("/", async (req, res) => {
    try{
        //const productss = await productService.getProducts({})
        const { limit = 3, page = 1 } = req.query;
        const products = await productModel.paginate({}, {limit: parseInt(limit), page: parseInt(page)})
        const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = products;
        res.render("home", {products: docs, totalDocs, totalPages,hasNextPage,hasPrevPage,nextPage,prevPage, currentPage: page, limit});
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
