//Web socket es un protocolo como http
//Se utiliza cunado se necesita que la pagina/app este actualizandose contstantemente. Ej, mail, billeteras virtuales, pujas, monedas virtuales

//el protocolo de websocket establece dos endpoints de comunicacion llamados socket, contar con estos dos sockets permite una comunicacion bidireccional
//comunicacion bidireccional permite:
//Que el cliente puede obtener recursos del servidor cuando lo solicite (como en HTTP)
//Que el servidor pueda entregar información al cliente sin necesidad de que el cliente haga una petición.

//Como funciona websockets: comienza con el apreton de manos (handshake) que consiste en un contrato en el cual el servidor puede actualizar al cliente sin que éste se lo pida. 
//una vez hecho esto comienza la comunicacion bidireccional, una comunicacion persistenete

const socketServer = new Server(httpServer)
socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    socket.on("message", data => {
        console.log(data)
    })

    socket.emit("evento_para_un_socket_individual", "este mensaje solo lo debe recibir el socket actual")

    socket.broadcast.emit("evento_para_todos_menos_para_el_socket_actual", "este evento lo veran todos los sockets conectados menos el socket actual que envio el mensaje")

    socketServer.emit("mensaje_para-todos", "este mensaje es para todos")
})
