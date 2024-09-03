import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const cartCollection = "carts"

//estructura que se va a cumplir a raja tabla de como vamos a trabajr los datos
//configuramos manualmente email para uqe sea unico y no puedan repetirse
const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products"
            },
            quantity:{
                type: Number,
                required: true,
                default: 1
            }
        }
        ]
}) 

cartSchema.plugin(mongoosePaginate)

export const cartModel = model(cartCollection, cartSchema)