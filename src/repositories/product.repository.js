import ProductDao from "../dao/product.dao.js"

const productDao = new ProductDao()

class ProductRepository{
    async getProducts(filter){
        const products = await productDao.find(filter)
        return products
    }

    async getProductById(id){
        const product = await productDao.findById(id)
        return product
    }

    async getProduct(filter){
        const product = await productDao.findOne(filter)
        return product
    }

    async createProduct(data){
        return productDao.save(data)
    }

    async findByIdAndUpdateProduct(data,id){
        const result = await productDao.updateById(data,id)
        return result
    }

    async deleteProduct(id){
        const result = await productDao.delete(id)
        return result
    }

}

export default ProductRepository