import { json } from 'express'
import fs from 'fs'

const path = "./dbjson/productsDb.json"

class ProductsManagerFs {
    constructor(){
        this.path = path
    }

    readProducts = async () => {
        try{
                const productsJson = await fs.promises.readFile(path, "utf-8")
                const productsJs = JSON.parse(productsJson)
                return productsJs
        } catch (error) {
            return []
        }
    }

    //crud productos
    getProducts = async () => {
        try{
            const products = await this.readProducts()
            return products
        } catch (error){
            console.error(error);
        }
    }

    getProduct = async (id) => {
        try{
            const products = await this.readProducts()
            
            const product = products.find(product => product.id === parseInt(id))
            return product
        }catch(error){
            console.error(error)
        }
    }

    createProduct = async (newProduct) => {
        try{
            const products = await this.readProducts()

            for (const product of products) {
                if(product.code === newProduct.code)
                    return "No se pudo agregar el producto debido a que el codigo ya existe"
            }

            if(products.length == 0){
                newProduct.id= 1;
            }else{
                newProduct.id = products[products.length - 1].id + 1
            }

            products.push(newProduct);

            await fs.promises.writeFile(path,JSON.stringify(products, null, "\t"))
            return newProduct

        } catch(error) {
            console.error(error);
        }
    }

    updateProduct = async (updatesProduct,pid) => {
        try{
            const products = await this.readProducts()

            const index = products.findIndex(product => product.id === parseInt(pid))

            if(index === -1)
                return "Producto no encontrado"

            delete updatesProduct.id

            products[index] = {...products[index], ...updatesProduct}

            await fs.promises.writeFile(path,JSON.stringify(products,null,"\t"))

            return "Producto actualizado"
            
        }catch(error){
            console.error(error)
        }

    }
    deleteProduct = async (id) => {
        try{
            const products = await this.readProducts()

            const newProducts = products.filter(product => product.id !== parseInt(id))

            await fs.promises.writeFile(path,JSON.stringify(newProducts,null, "\t"))

            return "se ha eliminado el product"
        } catch(error){
            console.error(error)
        }
    }
}

export default ProductsManagerFs