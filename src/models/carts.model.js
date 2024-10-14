import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const cartCollection = "carts"


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