import {respuesta} from "../utils/reutilizable.js"
import ProductsManagerFs from "../managers/FileSystem/products.managers.js";

const productService = new ProductsManagerFs();

class ProductController{
    async getProducts(req,res){
        try {
            const {limit = 10, page = 1, query ="",sort} = req.query
            const limitInt = parseInt(limit)
            const pageInt = parseInt(page)
            let filter = {}
            if(query){
                filter={type:query}
            }
            let products = await productService.getProducts({});
            if(sort==="asc"){
                products = products.sort((a,b)=> a.price - b.price)
            }else if (sort==="desc"){
                products = products.sort((a,b)=> b.price - a.price)
            }
            const startIndex = (pageInt - 1)* limitInt
            const endIndex = pageInt * limitInt
            const paginatedProducts = products.slice(startIndex,endIndex)
            res.send({status: "success", data: paginatedProducts, page:pageInt, limit: limitInt, total: products.length})           
        } catch (error) {
            respuesta(res,500,"Error al obtener productos")
        }
    }

    async getProduct(req,res){
        try {
            const {pid} = req.params
            const product = await productService.getProduct(pid)
            respuesta(res,200,product)
        } catch (error) {
            respuesta(res,500,"Error al obtener el producto")
        }
    }

    async postProduct(req,res){
        try {
            const {body} = req
            const response = await productService.createProduct(body)       
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al crear producto")
        }
    }

    async putProduct(req,res){
        try {
            const {pid} = req.params
            const {body} = req
            const response = await productService.updateProduct(body,pid)
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al actualizar producto")
        }
    }

    async deleteProduct(req,res){
        try {
            const {pid} = req.params
            const response = await productService.deleteProduct(pid)
            respuesta(res,200,response)
        } catch (error) {
            respuesta(res,500,"Error al eliminar producto")
        }
    }
}

export default ProductController