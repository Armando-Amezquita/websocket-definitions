const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path')
const app = express();

// Server static files
app.use( express.static(path.join(__dirname, "views")))
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

    io.on('connection', socket => {
        socket.on("circle position", position => {
            //broadcast => emit events to all users connected but less to me
            socket.broadcast.emit('move circle', position)
        })
    })

})

httpServer.listen(3000, con => {
    console.log('conected at 3000')
})