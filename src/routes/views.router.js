import { Router } from "express";
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";

export default (io) => {
    const router = Router();
    const productService = new ProductsManagerFs();

    router.use("/", (req, res) => {
        res.render("home", {});
    });

    router.post("/realtimeproducts", async (req, res) => {
        try {
            const { body } = req;

            await productService.createProduct(body);
            const newProducts = await productService.getProducts();

            io.emit("realTime", newProducts);

            res.render("realTimeProducts", {});
        } catch (error) {
            console.error(error);
        }
    });

    return router;
};

