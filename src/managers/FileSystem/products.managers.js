import { json } from 'express';
import fs from 'fs';
import { productModel } from '../../models/products.model.js';


const path = "./dbjson/productsDb.json"

class ProductsManagerFs {
    constructor(){
        this.path = path
    }


    //crud productos
    getProducts = async (filter) => {
        try{
            const products = await productModel.find(filter)
            return products
        } catch (error){
            console.error(error);
        }
    }

    getProductById = async (id) => {
        try{
            const product = await productModel.findById(id)

            return product
        }catch(error){
            console.error(error)
        }
    }

    createProduct = async (newProduct) => {
        try{
            if(await productModel.findOne({code: newProduct.code}))
            {
                return "Este producto ya existe"
            }

            await productModel.create(newProduct)

            return "Producto agregado"

        } catch(error) {
            console.error(error);
        }
    }

    updateProduct = async (updatesProduct,pid) => {
        try{
            const updatedProduct = await productModel.findByIdAndUpdate(pid,updatesProduct)

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
            const result = await productModel.deleteOne({_id: id})
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