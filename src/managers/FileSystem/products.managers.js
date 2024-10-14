import { json } from 'express';
import ProductRepository from '../../repositories/product.repository.js';

const productRepository = new ProductRepository
const path = "./dbjson/productsDb.json"

class ProductsManagerFs {
    constructor(){
        this.path = path
    }


    //crud productos
    getProducts = async (filter) => {
        try{
            const products = await productRepository.getProducts(filter)
            return products
        } catch (error){
            console.error(error);
        }
    }

    getProductById = async (id) => {
        try{
            const product = await productRepository.getProductById(id)

            return product
        }catch(error){
            console.error(error)
        }
    }

    createProduct = async (newProduct) => {
        try{
            if(await productRepository.getProduct({code: newProduct.code}))
            {
                return "Este producto ya existe"
            }

            await productRepository.createProduct(newProduct)

            return "Producto agregado"

        } catch(error) {
            console.error(error);
        }
    }

    updateProduct = async (updatesProduct,pid) => {
        try{
            const updatedProduct = await productRepository.findByIdAndUpdateProduct(updatesProduct,pid)

            if(!updatedProduct)
            {
                return "Producto no encontrado"
            }

            return "Producto actualizado"
            
        }catch(error){
            console.error(error)
        }

    }
    deleteProduct = async (id) => {
        try{
            const result = await productRepository.deleteProduct({_id: id})
            if(result.deletedCount===0)
            {
                return "Producto no encontrado"
            }
            return "Producto eliminado con exito"
        } catch(error){
            console.error(error)
        }
    }
}

export default ProductsManagerFs