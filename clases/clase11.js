//Web socket es un protocolo como http
//Se utiliza cunado se necesita que la pagina/app este actualizandose contstantemente. Ej, mail, billeteras virtuales, pujas, monedas virtuales

//el protocolo de websocket establece dos endpoints de comunicacion llamados socket, contar con estos dos sockets permite una comunicacion bidireccional
//comunicacion bidireccional permite:
//Que el cliente puede obtener recursos del servidor cuando lo solicite (como en HTTP)
//Que el servidor pueda entregar información al cliente sin necesidad de que el cliente haga una petición.

//Como funciona websockets: comienza con el apreton de manos (handshake) que consiste en un contrato en el cual el servidor puede actualizar al cliente sin que éste se lo pida. 
//una vez hecho esto comienza la comunicacion bidireccional, una comunicacion persistenete