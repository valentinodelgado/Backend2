import {Schema, model} from "mongoose";


const orderCollections = "orders"
const orderSchema = new Schema({
    name: String,
    size: {
        type: String,
        //user role en vez de los tamaños de pizaa
        enum:["small","medium","large"],
        default: "medium"
    },
    price: Number,
    quantity: Number,
    date: Date
})

export const orderModel = model(orderCollections,orderSchema)

