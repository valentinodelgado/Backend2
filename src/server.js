//Crud: create, read, upload, delete
import express from "express";
import userRouter from "./routes/users.router.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js";
import ProductsManagerFs from "./managers/FileSystem/products.managers.js";
import { fileURLToPath } from 'url';
import { dirname } from 'node:path'
import morgan from "morgan";
import uploader from "./utils/multer.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io"



const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const productService = new ProductsManagerFs()


const httpServer = app.listen(PORT,() => {
    console.log("Escuchando");
})

const io = new Server(httpServer)
let messages = []
io.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    socket.on("message", data => {
        //console.log(data)
        messages.push(data)
        io.emit("messageLogs", messages)
    })

    //manejo de productos
    socket.on("getProducts", async () => {
        const products = await productService.getProducts()
        io.emit("productsData", products)
    })

})



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/static",express.static(__dirname + "/public")) //le estoy diciendo a express que utilice esta carpeta public como la carpeta de archivos estaticos, el primer parametro crea una carpeta virtual para que no sea tan facil acceder 
app.use(morgan("dev"))

//configuracion del motor de plantillas, usamos engine que es un metodo
app.engine("handlebars", handlebars.engine())
//configurar la carpta donde debe tomar las plantillas
app.set("views", __dirname + "/views") //primer argumneto digo que en views estan mis plantillas y el segundo es la direccion
//extencion de las plantillas
app.set("view engine", "handlebars")


app.use("/home", viewsRouter(io))

//Los middlewars son procesos que ocurren antes de llegar a los endpoints
app.use(function(req,res,next){
    console.log("Time: ", Date.now())
    next() //next hace que se pueda avanzar porq sino se queda cargando
})

//endpoints
app.use("/api/users",userRouter) //usa la ruta del primer parametro para la configuracion de userRouter, esta se concatena con las que hay en el otro archivo

//endpoints entrega 1
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

//manejo de errores
app.use((error,req, res, next)=> {
    console.log(error.stack)
    res.status(500).send("error de server")
}) //Siempre en manejo de errores error tiene que ser el primer parametro de la callback



