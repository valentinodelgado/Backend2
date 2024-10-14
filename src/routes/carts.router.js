import { Router } from "express";
import CartController from "../controllers/carts.controller.js";
import passport from "passport";
import { onlyUser } from "../middleware/auth.js";


const router = Router();

const cartController = new CartController()

//RUTAS

router.get("/:cid", cartController.getCart)
router.post("/:cid/product", cartController.postProductCart)
router.post("/", cartController.postCart)
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart)
router.delete("/:cid", cartController.deleteProductsFromCart)
router.put("/:cid", cartController.putCart)
router.put("/:cid/product/:pid", cartController.putProductQuantityCart);
router.post("/:cid/purchase",passport.authenticate("current", {session: false}),onlyUser ,cartController.purchaseCart)



export default router

