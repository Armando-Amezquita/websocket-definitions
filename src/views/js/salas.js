const socket = io();

const connectRoom1 = document.querySelector('#connectRoom1')
const connectRoom2 = document.querySelector('#connectRoom2')
const connectRoom3 = document.querySelector('#connectRoom3')

connectRoom1.addEventListener('click', () =>{
    socket.emit('connect to room', 'room1')
})
connectRoom2.addEventListener('click', () =>{
    socket.emit('connect to room', 'room2')
})
connectRoom3.addEventListener('click', () =>{
    socket.emit('connect to room', 'room3')
})

//Send messages
const sendMessages = document.getElementById('sendMessageButton');
sendMessages.addEventListener('click', () => {
    const message = prompt('White your message');
    socket.emit('message room', message)
})

socket.on('send message', data => {
    console.log('data', data)
    const { room } = data; 
    const { message } = data; 
    const li = document.createElement('li');
    li.textContent = message
    document.querySelector(`#${room}`).append(li);
})