const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path')
const app = express();

// Server static files
app.use( express.static(path.join(__dirname, "views")))

app.get('/salas', (req,res) => {
    res.sendFile(__dirname + '/views/salas.html')
})
app.get('/namespaces', (req,res) => {
    res.sendFile(__dirname + '/views/namespaces.html')
})
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/index.html')
})

const socketsOnline = []; 

// Server of http 
const httpServer = createServer(app);
// Server socket
const io = new Server(httpServer);

// Connection with socket
io.on('connection', socket => {

    //save socket or clients connected
    socketsOnline.push(socket.id)
    console.log('socketsOnline', socketsOnline)

    //Clients conect
    console.log('clients conected', io.engine.clientsCount);
    //Id for every client
    console.log('Id socket client', socket.id) 

    //know if client disconneted
    socket.on('disconnect', () => {
        console.log('The client', socket.id, 'disconnected')
    })

    //Emit Events to listen in navegator or client 
    // first parameter = name of event.
    // second parameter = Content or data that emit to client
    socket.emit('welcome', 'Now you are connected :)');

    //For emit event for everyone we need to use: io
    io.emit('nameevent', socket.id + 'user connected');

    //Emit event for the last connected to server
    socket.on('sayhello', msg => {
        const lastSocket = socketsOnline[socketsOnline.length - 1]
        io.to(lastSocket).emit('greet', msg)
    })

    
    socket.on("circle position", position => {
        //broadcast => emit events to all users connected but less to me
        socket.broadcast.emit('move circle', position)
    })

    // Socket allow create own methods which any name
    socket.connectedRoom = '';

    socket.on('connect to room', room => {

        //Here leave all users from sala
        socket.leave(socket.connectedRoom);

        switch (room) {
            case 'room1':
                socket.join('room1');
                socket.connectedRoom = 'room1'
                break;
            case 'room2':
                socket.join('room2');
                socket.connectedRoom = 'room2'
                break;
            case 'room3':
                socket.join('room3');
                socket.connectedRoom = 'room3'
                break;
        
            default:
                break;
        }
    })

    socket.on('message room', message => {
        const room = socket.connectedRoom;
        io.to(room).emit('send message', {
            message, room
        })
    })

})

httpServer.listen(3000, con => {
    console.log('conected at 3000')
})

//connect to different namespaces of socket;

const teachers = io.of('teachers');
const students = io.of('students');

teachers.on('connection', socket => {
    console.log(socket.id + 'connected at teachers sala');

    socket.on('send msg', data => {
        teachers.emit('msg', data)
    })
})

students.on('connection', socket => {
    console.log(socket.id + 'connected at students sala')
    socket.on('send msg', data => {
        students.emit('msg', data)
    })
})