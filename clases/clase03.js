let valor = 2**3; //Es 2 elevado a la 3
console.log(`El resultadod de 2 a la 3 es ${valor} `);

let frutas = ["Pera", "Manzana", "Durazno"];

console.log(`En el array esta pera? : ${frutas.includes("Pera")} `); //El includes devuele true o false si esta o no el elemento dentro del array

let valoresBase = [1,2,3,4,5,6]
let nuevosValores = valoresBase.map((numero,indice)=>numero**indice); //con el map tomamos todos los numeros y los elevamos a su indice en el array 
console.log(nuevosValores)