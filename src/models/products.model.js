import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productCollection = "products"

//estructura que se va a cumplir a raja tabla de como vamos a trabajr los datos
//configuramos manualmente email para uqe sea unico y no puedan repetirse
const productSchema = new Schema({
    title: {
        type: String,
        requeried: true
    },
    description: {
        type: String,
        requeried: true
    },
    code: {
        type: String,
        unique: true,
        requeried: true
    },
    price: {
        type: Number,
        requeried: true
    },
    status:{
        default: true,
        requeried: true,
        type: Boolean
    },
    stock: {
        type: Number,
        requeried: true
    },
    category: {
        type: String,
        requeried: true
    },
    thumbnails: [String]

}) 

productSchema.plugin(mongoosePaginate)

export const productModel = model(productCollection, productSchema)