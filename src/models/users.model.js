import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const userCollection = "users"


const userSchema = new Schema({
    user: {
        type: String,
        requeried: true
    },
    last_name: {
        type: String,
        requeried: true
    },
    email: {
        type: String,
        requeried: true, 
        unique: true 
    },
    age: Number,
    password: {
        type: String,
        requeried: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "cart"
    } ,
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user"
    }
}) 

userSchema.plugin(mongoosePaginate)

export const userModel = model(userCollection, userSchema)