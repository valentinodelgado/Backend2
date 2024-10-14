import { productModel } from "../models/products.model.js";

class ProductDao{
    async find(filter){
        return productModel.find(filter)
    }
    async findById(id){
        return productModel.findById(id)
    }
    async findOne(filter){
        return productModel.findOne(filter)
    }

    async save(data){
        const product  = new productModel(data)
        return await product.save()        
    }

    async updateById(data,id){
        return productModel.findByIdAndUpdate(id,data)
    }

    async delete(id){
        return productModel.deleteOne(id)
    }

}

export default ProductDao