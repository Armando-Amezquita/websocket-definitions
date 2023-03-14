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

// Server of http 
const httpServer = createServer(app);
// Server socket
const io = new Server(httpServer);

// Connection with socket
io.on('connection', socket => {
    //Clients conect
    console.log('clients conected', io.engine.clientsCount);
    //Id for every client
    console.log('Id socket client', socket.id) 

    //know if client disconneted
    socket.on('disconnect', () => {
        console.log('The client', socket.id, 'disconnected')
    })

})

httpServer.listen(3000, con => {
    console.log('conected at 3000')
})