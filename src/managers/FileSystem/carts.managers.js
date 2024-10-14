import { json } from 'express';
import { pid } from 'process';
import CartRepository from '../../repositories/cart.repository.js';
import ProductsManagerFs from './products.managers.js';

const cartRepository = new CartRepository()
const productService = new ProductsManagerFs()
const path = "./dbjson/cartsDb.json"


class CartManagerFs{
    constructor(){
        this.path = path
    }


    createCart = async (Cart) => {
        try{

            const newCart = await cartRepository.createCart(Cart)

            return newCart

        } catch(error) {
            console.error(error);
        }
    }

    getCartById = async (cid) => {
        try{
            const cart = await cartRepository.getCartById(cid)
            if(cart){
                return cart
            }
            else{
                return "No se encontro el carrito"
            }
        }catch(error){
            console.error(error)
        }
    }

    createProductToCart = async (product, cid) => {
        try {
            // Buscar el carrito por ID
            const cart = await cartRepository.getCartById(cid);
    
            if (!cart) {
                return "El carrito no existe";
            }
    
            // Verificar si product._id es una cadena válida o un ObjectId
            if (!product || !product._id) {
                console.error("El producto o el ID del producto no están definidos.");
                return "El producto es inválido";
            }
    
            // Verificar si product._id es un ObjectId válido
            const productId = product._id.toString();
            
            // Buscar el producto en el carrito
            const existingProduct = cart.products.find(p => p.product && p.product.toString() === productId);
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
    
            // Guardar el carrito actualizado
            await cart.save();
    
            return "Producto agregado con éxito";
        }catch(error){
            console.error(error)
        }
    } 

    deleteProductFromCart = async (pid,cid) => {
        try{
            let result = await cartRepository.updateCart(
                {_id: cid},
                {$pull: {products: {id: pid}}}
            )
            if (result.modifiedCount > 0) {
                return "Se ha eliminado el producto";
            } else {
                return "No se encontró el producto o el carrito";
            }
        }catch(error){
            console.error(error)
        }
    }

    deleteProductsFromCart = async (cid) => {
        try{
            let result = await cartRepository.updateCart(
                {_id: cid},
                {$set: {products: []}}
            )

            return "Se elimianron todos los productos"

        }catch(error){
            console.error(error)
        }
    }

    updateCart = async (cid,body) => {
        try{
            let result = await cartRepository.updateCart(
                {_id: cid},
                {$set: {products: body}}
            )

        }catch(error){
            console.error(error)
        }
    }

    updateQuantityProductFromCart = async (cid,pid,body) => {
        try{
            let result = await cartRepository.updateCart(
                {_id: cid, "products._id": pid},
                {$inc: {"products.$.quantity": body.quantity}}
            )
            return "Se ha aumentado la cantidad del producto indicado"
        }catch(error){
            console.error(error)
        }
    }

    stockChek = async (cid) =>{
        try {
            let cart = await cartRepository.getCartById(cid)
            let products = []
            let missingProducts= []

            for (const item of cart.products) {
                let product = await productService.getProductById(item.product)
                if(product.stock >= item.quantity){
                    await productService.updateProduct({stock: product.stock - item.quantity },item.product)
                    products.push(item)
                } else {
                    missingProducts.push(item.product)
                }
            }
            return {products, missingProducts}
        } catch (error) {
            console.error(error)
        }
    }  

}


export default CartManagerFs