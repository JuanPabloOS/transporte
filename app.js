const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
let server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.get('/login', function(req, res) { 
  res.sendFile(__dirname+'/public/login.html'); 
});

//usar socket.io
const socketIO = require('socket.io');
let io = socketIO(server);

//crear el socket
io.on('connection', function(client){
    console.log('an user connected');
    //manejador de eventos
    client.on('enviar',(data)=>{      
      io.emit('enviar',{bus:data.bus,opcion:data.opcion});

    })
});

  server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
