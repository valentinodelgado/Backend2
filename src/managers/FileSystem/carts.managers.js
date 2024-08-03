import { json } from 'express'
import fs from 'fs'
import { pid } from 'process'

const path = "./dbjson/cartsDb.json"

class CartManagerFs{
    constructor(){
        this.path = path
    }

    readCarts = async () => {
        try{
                const cartsJson = await fs.promises.readFile(path, "utf-8")
                const cartsJs = JSON.parse(cartsJson)
                return cartsJs
        } catch (error) {
            return []
        }
    }

    createCart = async (product) => {
        try{
            const carts = await this.readCarts()

            const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;

            const newCart = {
                id: newId,
                products: product
            }

            carts.push(newCart);

            await fs.promises.writeFile(path,JSON.stringify(carts, null, "\t"))
            return newCart

        } catch(error) {
            console.error(error);
        }
    }

    getCartById = async (cid) => {
        try{
            const carts = await this.readCarts()

            const cart = carts.find(cart => cart.id === parseInt(cid))

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

    createProductToCart = async (product, cid) => {
        try{
            const carts = await this.readCarts()

            const cart = carts.find(c => c.id === parseInt(cid))
            

            const existingProduct = cart.products.find(p => p.product === parseInt(product.id))

            if(existingProduct){
                existingProduct.quantity += 1
            }else{
                cart.products.push({product: product, quantity: 1});
            }

            await fs.promises.writeFile(path,JSON.stringify(carts, null, "\t"))


        }catch(error){
            console.error(error)
        }
    } 

}

//formato
//[
//    {id: "". products: [{productId: "", quantity: 1}]}
//]

export default CartManagerFs