import { json } from 'express';
import fs from 'fs';
import { pid } from 'process';
import { cartModel } from '../../models/carts.model.js';



const path = "./dbjson/cartsDb.json"

class CartManagerFs{
    constructor(){
        this.path = path
    }

//    readCarts = async () => {
//        try{
//                const cartsJson = await fs.promises.readFile(path, "utf-8")
//                const cartsJs = JSON.parse(cartsJson)
//                return cartsJs
//        } catch (error) {
//            return []
//        }
//    }

//    createCart = async (product) => {
//        try{
//            const carts = await this.readCarts()

//            const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;

//            const newCart = {
//                id: newId,
//                products: product
//            }

//            carts.push(newCart);

//            await fs.promises.writeFile(path,JSON.stringify(carts, null, "\t"))
//            return newCart

//        } catch(error) {
//            console.error(error);
//        }
//    }

    getCartById = async (cid) => {
        try{
            const cart = await cartModel.findById(cid).populate("products.product")
            if(cart){
                return cart.products
            }
            else{
                return "No se encontro el carrito"
            }
        }catch(error){
            console.error(error)
        }
    }

//    createProductToCart = async (product, cid) => {
//        try{
//            const carts = await this.readCarts()

//            const cart = carts.find(c => c.id === parseInt(cid))
            

//            const existingProduct = cart.products.find(p => p.product === parseInt(product.id))

//            if(existingProduct){
//                existingProduct.quantity += 1
//            }else{
//                cart.products.push({product: product, quantity: 1});
//            }

//            await fs.promises.writeFile(path,JSON.stringify(carts, null, "\t"))


//        }catch(error){
//            console.error(error)
//        }
//    } 

    deleteProductFromCart = async (pid,cid) => {
        try{
            let result = await cartModel.updateOne(
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
            let result = await cartModel.updateOne(
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
            let result = await cartModel.updateOne(
                {_id: cid},
                {$set: {products: body}}
            )

        }catch(error){
            console.error(error)
        }
    }

    updateQuantityProductFromCart = async (cid,pid,body) => {
        try{
            let result = await cartModel.updateOne(
                {_id: cid, "products._id": pid},
                {$inc: {"products.$.quantity": body.quantity}}
            )
            return "Se ha aumentado la cantidad del producto indicado"
        }catch(error){
            console.error(error)
        }
    }

}


export default CartManagerFs