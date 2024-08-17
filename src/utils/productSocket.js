import ProductsManagerFs from "../managers/FileSystem/products.managers.js"

const productSocket = (io) => {
    io.on("connection", async socket => {
        try{
            console.log("Cliente en linea")
            const productService = new ProductsManagerFs()
            const products = await productService.getProducts()
            socket.emit("products", products)

            socket.on("addProduct", async (data) => {
                await productService.createProduct(data)
                const updatedProducts = await productService.getProducts()
                io.emit("products", updatedProducts)
            })

            socket.on("deleteProduct", async data => {
                await productService.deleteProduct(data.id)
                const updatedProducts = await productService.getProducts()
                io.emit("products", updatedProducts)
            })
        }catch(error){
            console.error(error)
        }
        })
    }   

export default productSocket