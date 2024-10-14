import { Router } from "express";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";
import { productModel } from "../models/products.model.js";
import { onlyUser, onlyAdmin } from "../middleware/auth.js";
import passport from "passport";


const router = Router();
const productService = new ProductsManagerFs();

router.get("/products",passport.authenticate("current", {session: false}),onlyUser ,async (req, res) => {
    try{
        const { limit = 2, page = 1} = req.query;
        const products = await productModel.paginate({}, {limit: parseInt(limit), page: parseInt(page)})
        const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = products;
        res.render("home", {products: docs, totalDocs, totalPages,hasNextPage,hasPrevPage,nextPage,prevPage, currentPage: page, limit});
    }catch(error){
        console.error(error)
    }
});

router.get("/realtimeproducts",passport.authenticate("current", {session: false}),onlyAdmin ,async (req, res) => {
    try{
        res.render("realTimeProducts", {})
    }catch(error){
        console.error(error)
    }
});


export default router;
