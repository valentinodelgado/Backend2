//Funcionamiento map (devuelve un nuevo array con lo que le pidamos que haga la funcion que recibe como parametro)

let valoresOriginales = [1,2,3,5,6,4];

let nuevosValores = valoresOriginales.map( x => x + 1 );

console.log(valoresOriginales);

console.log(nuevosValores);

const funcionPar = (valor) => {
    if(valor%2 === 0)
    {
        return valor;
    }
    else
    {
        return "No es par"
    }
}

console.log(funcionPar(5));

let nuevosValoresPares = valoresOriginales.map(funcionPar);

console.log(nuevosValoresPares);

//funcion map

function miFuncionMap (arreglo,funcionCallback) {
    //La funcion callback es la funcion que recibe como parametro
    let nuevoArreglo= [];
    for(let i = 0; i< arreglo.length ; i++)
    {
        const elemento = arreglo[i];
        let nuevoValor = funcionCallback(elemento);
        nuevoArreglo.push(nuevoValor);
    }
    return nuevoArreglo;
}

console.log(miFuncionMap(valoresOriginales,x => x + 1));