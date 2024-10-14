import ProductsManagerFs from "../managers/FileSystem/products.managers.js";

const productService = new ProductsManagerFs

export async function calculateTotalPrice (products){
    let price = 0
    for (const product of products) {
        //const item = await productService.getProductById(product)
        if(product){
            price += product.product.price * product.quantity
        } else{
            console.error(`Producto no encontrado ${product}`)
        }
    }
    return price
}

export function uniqueCode(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    
    for (let i = 0; i < 10; i++) { // Genera un código de 10 caracteres
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    
    return code;
}