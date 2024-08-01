const generarNumAleatorio = (cantidad) => {
    const numeros = [];
    for(let i=0;i<cantidad;i++)
    {
        const numeroAleatorio = Math.floor(Math.random()*20) + 1 //math.floor redondea hacia abajo, math.random genera un numero entre 0 y 1
        numeros.push(numeroAleatorio);
    }
    return numeros;
}

function contarFrecuencia(numeros) {
    return new Promise((resolve,reject) => {
        const frecuencia = {};
        for(const numero of numeros){
            if(frecuencia[numero])
            {
                frecuencia[numero]++;
            }
            else{
                frecuencia[numero] = 1;
            }
        }
        resolve(frecuencia);
    })
}

const cantidadNumerosAleatorios = 10000;

const numeros = generarNumAleatorio(cantidadNumerosAleatorios);

console.log(`Los numeros aleatorios son ${numeros}`);

contarFrecuencia(numeros).then(result => {
    console.log(result);
})

//modulo crypto

//require trae modulos, crypto sirve para encriptar contraseñas

//path: ruta donde esta guardado el archivo de usuario

const fs = require("fs");

const crypto = require("crypto");

class UserManager {
    constructor(path){
        this.path = path;
    }

    async agregarUsuario (usuario){
        if(!usuario.nombre || !usuario.apellido || !usuario.password || !usuario.nombreUsuario) 
        {
            return console.log("Usuario Incompleto");
        }

        const { nombre, apellido, password, nombreUsuario} = usuario;
        const usuarios = await this.nombreUsuario();
        const passwordSecurizada = await this.securizarPassword(password);
        const nuevoUsuario = {
            nombre,
            apellido,
            password: passwordSecurizada,
            nombreUsuario
        }

        usuarios.push(nuevoUsuario);
        await fs.promises.writeFile(this.path,Json.stringify(usuarios),"utf-8");
    }

    async obtenerUsuarios(){
        try{
            const resultado = await fs.promises.readFile(this.path, "utf-8");
            const usuarios = JSON.parse(resultado);
            return usuarios;
        }catch (error){
            return [];
        }
    }

    async securizarPassword(password){
        const hash = crypto.createHash("sha256");  //crea algoritmo de encriptacion para complicar la contraseña
        hash.update(password);
        const passwordSecurizada = hash.digest("hex"); //transforma a hexadecimal
        return passwordSecurizada
    }

    async validarUsuario(nombreUsuario, password){
        const users = await this.obtenerUsuarios();
        const user = users.find(u => u.nombreUsuario === nombreUsuario);
        if(!user){
            return console.log("El usuario no existe");
        }
        const bdPassword = user.password;
        const passwordSecurizada = await this.securizarPassword(password);
        if(bdPassword === passwordSecurizada)
            console.log("Logueado correctamente")
        else
            console.log("Cointraseña incorrecta");
    }
}

const test = async () => {
    const userManager = new UserManager("./user.json");
    await userManager.agregarUsuario({
        nombre: "Valentino",
        apellido: "Delgado",
        password: "13637749",
        nombreUsuario: "chelo2234"
    })

    await userManager.validarUsuario("chelo2234", "13637749");
}

test();