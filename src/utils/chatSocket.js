const chatSocket = (io) => {
    let messages = []
    io.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    socket.on("message", data => {
        //console.log(data)
        messages.push(data)
        io.emit("messageLogs", messages)
    })

    //manejo de productos
    socket.on("getProducts", async () => {
        const products = await productService.getProducts()
        io.emit("productsData", products)
    })
})
} 

export default chatSocket