import {cartModel} from "../models/carts.model.js"


class CartDao {
    async save(data){
        const cart  = new cartModel(data)
        return await cart.save()
    }

    async findById(id){
        return await cartModel.findById(id).populate('products.product');
    }

    async upadateOne(data){
        return await cartModel.updateOne(data)
    }
}

export default CartDao