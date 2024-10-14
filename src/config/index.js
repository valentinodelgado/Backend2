import {connect} from "mongoose"

export const connectDB = async () => {
    console.log("Base de datos conectada")
    await connect("mongodb+srv://valentinoldelgado:job45809306@cluster1.gxp6a.mongodb.net/c70125?retryWrites=true&w=majority&appName=cluster1")
}