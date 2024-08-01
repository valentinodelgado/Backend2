import fs from 'fs'

const path = "./db-json/cartDb.json"

class CartManagerFs{
    constructor(){
        this.path = path
    }

    readCart = async () => {
        try{
                const cartsJson = await fs.promises.readFile(path, "utf-8")
                const cartsJs = JSON.parse(cartsJson)
                return cartsJs
        } catch (error) {
            return []
        }
    }

    createCart = async () => {}

    getCartById = async () => {}

    createProductToCart = async () => {} 

}

//formato
//[
//    {id: "". products: [{productId: "", quantity: 1}]}
//]

export default CartManagerFs