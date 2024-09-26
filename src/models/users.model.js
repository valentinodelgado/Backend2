import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const userCollection = "users"

//estructura que se va a cumplir a raja tabla de como vamos a trabajr los datos
//configuramos manualmente email para uqe sea unico y no puedan repetirse
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
        requeried: true, //hace que sea obligatoria completar el mail
        unique: true //hace que no se puedan repetir 2 usuarios con el mismo mail
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