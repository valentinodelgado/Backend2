const socket = io()

socket.on("productsData", products => {
    const tabla = document.getElementById("tabla")
    tabla.innerHTML = ""
    products.forEach(product => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
        `
        tabla.appendChild(row)
    });
})

socket.emit("getProducts")