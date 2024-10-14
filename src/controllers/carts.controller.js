import {respuesta} from "../utils/reutilizable.js"
import CartManagerFs from "../managers/FileSystem/carts.managers.js"
import ProductsManagerFs from "../managers/FileSystem/products.managers.js"
import TicketManager from "../managers/FileSystem/ticket.managers.js";


const cartService = new CartManagerFs();
const productService = new ProductsManagerFs()
const ticketService = new TicketManager()


class CartController{
    async getCart(req,res){
        try {
            const {cid} = req.params
            const cart = await cartService.getCartById(cid)
            //const products = cart.products
            console.log(cart.products)
            res.render("cart",{cart})
        } catch (error) {
            respuesta(res,500,"Error al obtener el carrito")
        }
    }

    async postCart(req,res){
        try {
            const {body} = req
            const response = await cartService.createCart(body)
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al crear el carrito")
        }
    }

    async deleteProductFromCart(req,res){
        try {
            const {cid, pid} = req.params
            const response = await cartService.deleteProductFromCart(pid,cid)
            respuesta(res,200,response)         
        } catch (error) {
            respuesta(res,500,"Error al eliminar el producto del carrito")
        }
    }

    async deleteProductsFromCart(req,res){
        try {
            const {cid} = req.params
            const response = await cartService.deleteProductsFromCart(cid)
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al eliminar todos los productos del carrito")
        }
    }

    async putCart(req,res){
        try {
            const {cid} = req.params
            const {body} = req
            const response = await cartService.updateCart(cid,body)
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al actualizar el carrito")
        }
    }

    async putProductQuantityCart(req,res){
        try {
            const { cid, pid } = req.params;
            const {body} = req
            const result = await cartService.updateQuantityProductFromCart(cid,pid,body);
            respuesta(res,200,result)
        } catch (error) {
            respuesta(res,500,"Error al agregar el producto al carrito")
        }
    }

    async postProductCart(req,res){
        try {
            const {cid} = req.params
            const {body} = req
            const response = await cartService.createProductToCart(body,cid)
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al agregar producto")
        }
    }

    async purchaseCart(req,res){
        try {
            const {cid} = req.params
            const {products: validProducts, missingProducts} = await cartService.stockChek(cid)
            await ticketService.generateTicket(validProducts,req)
            const hasMissingProducts = missingProducts.length > 0;
            console.log(missingProducts)
            res.render("purchaseCart",{missingProducts,hasMissingProducts})
        } catch (error) {
            console.error(error)
            respuesta(res,500,"Error en la compra")
        }
    }
}

export default CartController