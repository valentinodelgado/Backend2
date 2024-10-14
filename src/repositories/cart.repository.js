import CartDao from "../dao/cart.dao.js";

const cartDao = new CartDao

class CartRepository{
    async createCart(data){
        return cartDao.save(data)
    }

    async getCartById(id){
            const cart = await cartDao.findById(id)
            return cart
    }

    async updateCart(data){
        result = await cartDao.updateOne(data)
        return result
    }


}

export default CartRepository