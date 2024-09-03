//Crud: create, read, upload, delete
import express from "express";
import userRouter from "./routes/users.router.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js";
import { fileURLToPath } from 'url';
import { dirname } from 'node:path'
import morgan from "morgan";
import uploader from "./utils/multer.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io"
import { connectDB } from "./config/index.js";
import chatSocket from "./utils/chatSocket.js";
import productSocket from "./utils/productSocket.js";



const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



const httpServer = app.listen(PORT,() => {
    console.log("Escuchando");
})

const io = new Server(httpServer)

chatSocket(io)

const ioMiddleware = (io) => (req,res,next) =>{
    req.io = io
    next()
}


productSocket(io)


//Moongose
connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/static",express.static(__dirname + "/public")) //le estoy diciendo a express que utilice esta carpeta public como la carpeta de archivos estaticos, el primer parametro crea una carpeta virtual para que no sea tan facil acceder 
app.use(morgan("dev"))
app.use(ioMiddleware(io))

//configuracion del motor de plantillas, usamos engine que es un metodo
app.engine('handlebars', handlebars.engine({
    // Puedes configurar opciones adicionales aquí si es necesario
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
//configurar la carpta donde debe tomar las plantillas
app.set("views", __dirname + "/views") //primer argumneto digo que en views estan mis plantillas y el segundo es la direccion
//extencion de las plantillas
app.set("view engine", "handlebars")


app.use("/api/home", viewsRouter)

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



