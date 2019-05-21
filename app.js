const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
let server = http.createServer(app);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

var UserRoute = require('./routes/UserRoutes');

app.use(express.static(__dirname + '/public'));

app.get('', function(req, res) { 
  res.sendFile(__dirname+'/public/login.html'); 
});
app.get('/login', function(req, res) { 
  res.sendFile(__dirname+'/public/login.html'); 
});

app.get('/home', function(req, res) { 
  res.sendFile(__dirname+'/public/index.html'); 
});

app.use('/transporte',UserRoute);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
