// This is the connection with the client. is require in the html document for you can need to use connect
const socket = io()

function checkSocketStatus(){
    // return a boolean value
    console.log('aqui')
    console.log(socket)
    console.log('State socket', socket.connected);
    return socket.connected
}

// Client too detected events of socket
socket.on('connect', () => {
    console.log('show in client console: conection in client', socket.id)
    console.log('Socket connected: ', checkSocketStatus())
})

// 
socket.on('disconnect', () => {
    console.log('The socket was disconnected', socket.id)
    console.log('Socket disconnected: ', checkSocketStatus())
})

//Event to detect when socket try to connect again
socket.io.on('reconnect_attempt', () => {
    console.log('Im try to reconnect')
})

//Event to listen when socket connected again
socket.io.on('reconnect', () => {
    console.log('Im connected again ')
})


