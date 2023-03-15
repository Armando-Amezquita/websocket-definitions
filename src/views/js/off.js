const socket = io();

const send = document.getElementById('send')
const disconnect = document.getElementById('disconnect')
const reconnect = document.getElementById('reconnect')


send.addEventListener('click', () => {
    if(socket.connected)
    socket.emit('is connected', 'your connected!');
})

disconnect.addEventListener('click', () => {
    socket.disconnect();
})
reconnect.addEventListener('click', () => {
    socket.connect();
})
/* 

Manejo offline
Cómo se mencionó antes, cuando se pierde la conexión, la librería es capaz de volver a restablecer la comunicación entre el cliente y el servidor.

Pero mientras tanto, todos los eventos que no se logren enviar serán almacenados en un buffer, hasta la conexión sea restablecida y todos los elementos de dicho buffer serán transmitidos, lo que hace posible que la carga de eventos a enviar sea enorme.

Es por ello, que existen 2 formas de manejar estas situaciones:

Atributo connected → Permite verificar si el socket está conectado, de ser así, se envían los datos, en caso contrario, estos son descartados.
Eventos volátiles → Estos eventos no serán enviados si la conexión no está lista y tampoco serán almacenados en el buffer de eventos. */
