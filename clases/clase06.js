const { error } = require("console");
const fs = require("fs");

//Utilizado de forma sincrona

fs.readFileSync //lee
fs.appendFileSync //AÑadir
fs.unlinkSync //elimina todo el archivo
fs.existsSync //corrobora que exista

fs.writeFileSync("./ejemplo.txt", "Hola como estas?", "utf-8");
if(fs.existsSync("./ejemplo.txt"))
{
    let contenido = fs.readFileSync("./ejemplo.txt","utf-8");
    console.log(contenido);
    fs.appendFileSync("./ejemplo.txt"," mas contenido","utf-8");
    contenido = fs.readFileSync("./ejemplo.txt","utf-8");
    console.log(contenido);
}


fs.writeFile("./ejemploCallback.txt", "Hola desde callback", (error) => {
    if(error) return console.log("No se pudo escribir el archivo");
    fs.readFile("./ejemploCallback.txt", "utf-8", (error, resultado) => {
        if(error) return console.log("No se pudo leer el archivo");
        console.log(resultado);
        fs.appendFile("./ejemploCallback.txt", " Mas contenido", (error => {
            if(error) return console,log("No se pudo actualizar el archivo");
            fs.readFile("./ejemploCallback.txt", "utf-8", (error, contenido) => {
                if(error) return console.log(error);
                console.log(contenido);
            })
        }))
    })
})


//ejercicio fecha

const fechaActual = new Date().toLocaleDateString();

fs.writeFile("./fecha_hora.txt", fechaActual, (error) =>{
    if (error) return console.log("No se pudo escribir el archivo");
    console.log("Escribiendo fecha y hora...");
    fs.readFile("./fecha_hora.txt","utf-8",(error,resultado) => {
        if(error) return console.log("No se pudo leer el archivo");
        console.log(resultado)
    })
})

//fs con promesas

fs.promises.writeFile
fs.promises.readFile
fs.promises.appendFile
fs.promises.unlink

const operacionesAsincronas = async() => 
{
    await fs.promises.writeFile("./fspromises.txt", "Hola desde promises", "utf-8");
    const resultado = await fs.promises.readFile("./fspromises.txt", "utf-8");
    console.log(resultado);
}