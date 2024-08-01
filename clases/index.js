//Usando luxon (modulo)

const {DateTime} = require("luxon");

const fechaHoy = DateTime.now();


const fechaNac = DateTime.fromISO("2005-01-03"); //ponemos una fecha de nacimientos
if(fechaHoy.isValid && fechaNac.isValid)
{
    const days = fechaHoy.diff(fechaNac).as("days"); //saca la diferencia de dias entre el nacimiento y hoy
    const diasRedondeados= Math.floor(days);
    console.log(`Han pasado ${diasRedondeados} dias desde que naci`);
}
else
    console.log("Fecha invalida")