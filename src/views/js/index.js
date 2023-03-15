// This is the connection with the client. is require in the html document for you can need to use connect
const socket = io()

const circle = document.getElementById('circle');
const drawCircle = (position) => {
    circle.style.top = position.top;
    circle.style.left = position.left;
}

const drag = e => {

    const position = {
        top: e.clientY + 'px',
        left: e.clientX + 'px',
    }

    drawCircle(position)
    socket.emit('circle position', position)
}

document.addEventListener("mousedown", e => {
    document.addEventListener("mousemove", drag)
})

document.addEventListener("mouseup", e => {
    document.removeEventListener("mousemove", drag)
})

socket.on('move circle', position => {
    drawCircle(position)
})

// Here recieved event Welcome from Back or server 
// socket.on('welcome', data => {
//     console.log('data from backend: ', data)
//     // Response at client with the data from server
//     const text = document.querySelector('#text')
//     text.textContent = data
// })

// socket.on('nameevent', msg => {
//     console.log('msg', msg)
// })

// //Emit event to client from server
// const emitEventSayHello = document.querySelector('#greeting');
// emitEventSayHello.addEventListener('click', () => {
//     console.log('click')
//     socket.emit('sayhello', "Hello last client connected")
// })

// socket.on('greet', msg => {
//     console.log('msg', msg)
// })


// function checkSocketStatus(){
//     // return a boolean value
//     console.log('aqui')
//     console.log(socket)
//     console.log('State socket', socket.connected);
//     return socket.connected
// }

// Client too detected events of socket
// socket.on('connect', () => {
//     console.log('show in client console: conection in client', socket.id)
//     console.log('Socket connected: ', checkSocketStatus())    
// })

// // 
// socket.on('disconnect', () => {
//     console.log('The socket was disconnected', socket.id)
//     console.log('Socket disconnected: ', checkSocketStatus())
// })

// //Event to detect when socket try to connect again
// socket.io.on('reconnect_attempt', () => {
//     console.log('Im try to reconnect')
// })

// //Event to listen when socket connected again
// socket.io.on('reconnect', () => {
//     console.log('Im connected again ')
// })


