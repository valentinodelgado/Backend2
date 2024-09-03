import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const userCollection = "users"

//estructura que se va a cumplir a raja tabla de como vamos a trabajr los datos
//configuramos manualmente email para uqe sea unico y no puedan repetirse
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        requeried: true, //hace que sea obligatoria completar el mail
        unique: true //hace que no se puedan repetir 2 usuarios con el mismo mail
    }
}) 

userSchema.plugin(mongoosePaginate)

export const userModel = model(userCollection, userSchema)