//const sumar = (numero1,numero2) => numero1+numero2;
//const restar = (numero1,numero2) => numero1-numero2;
//const multiplicar = (numero1,numero2) => numero1*numero2;
//const dividir = (numero1,numero2) => numero1/numero2;

//operacion es el callback
const calculos = async (num1,num2,operacion) => {
    try{
        const resultado = await operacion (num1,num2)
        console.log(resultado);
    }catch (error){
        console.log("error");
        console.log(error);
    };
}


const sumar = async (num1,num2) =>{
    return new Promise ((resolve,reject)=>{
        if(num1 === 0 || num2 === 0){
            reject("Operacion inecesaria");
        }
        if(num1+num2<0){
            reject("La calculadora solo debe devolver valores positivos");
        }
        let total = num1 + num2;
        resolve(total);
    })
}



const restar = async (num1,num2) =>{
    return new Promise ((resolve,reject)=>{
        if(num1 === 0 || num2 === 0){
            reject("Operacion invalida");
        }
        if(num1-num2<0){
            reject("La calculadora sólo puede devolver valores positivos");
        }
        let result = num1 - num2;
        resolve(result);
    })
}




const multiplicar = async (num1,num2) =>{
    return new Promise ((resolve,reject)=>{
        if(num1 <0 || num2 < 0){
            reject("Operacion invalida");
        }
        if(num1*num2 < 0){
            reject("La calculadora solo debe devolver valores positivos");
        }
        valor= num1 * num2;
        resolve(valor);
    })
}


const dividir = (dividendo,divisor) => {
    return new Promise ( (resolve, reject) => {
        if(divisor === 0){
            reject("No se puede dividir por 0")
        }
        else{
            resolve(dividendo/divisor);
        }
    })
}

dividir(5,2)
    .then(resultado =>{
        console.log(resultado);
    })
    .catch(error =>{
        console.log(error);
    });

const realizarOperacion = (numero1,numero2,funcionCallback) =>{
    console.log("Realizo la operacion que recibo");
    let resultado = funcionCallback(numero1,numero2);
    console.log(`El resultado de la operacion enviada es: ${resultado}`);
}

realizarOperacion(35,15,sumar);
realizarOperacion(35,15,restar);

calculos(10,0,dividir);
calculos(10,0,sumar);
calculos(10,0,restar);
calculos(10,0,multiplicar);