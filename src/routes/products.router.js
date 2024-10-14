import { Router } from "express";
import ProductController from "../controllers/products.controller.js"

const router = Router();

const productController = new ProductController()

//RUTAS

router.get("/", productController.getProducts)
router.get("/:pid", productController.getProduct)
router.post("/", productController.postProduct)
router.put("/:pid", productController.putProduct)
router.delete("/:pid", productController.deleteProduct)

export default router;