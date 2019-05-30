// ===================================================
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
let server = http.createServer(app);
const bodyParser = require('body-parser');
// ===================================================
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
//importar modelo bus
const {Bus} = require('./models/models');

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

// horarios ===================================================================
// función para el intervalo ==================================================

// function intervalFunc() {
//   var d = new Date();
//   var h = d.getHours();
//   var m = d.getMinutes();
//   console.log(`${h}-${m}`);
//   if(h>=18 && m>=45){
//     //juriquilla 19:10
//   }else if(h>=18){
//     // cu 18:30
//   }else if(h>=17){
//     //juriquilla 17:30
//   }else if(h>=16 && m>=30){
//     //cu 17:00
//   }else if(h>=){

//   }
// }
// setInterval(intervalFunc, 60000);


//crear el socket =============================================================
//usar socket.io
const socketIO = require('socket.io');
let io = socketIO(server);
io.on('connection', function(client){            
    //manejador de eventos
    
    

    client.on('enviar',(data)=>{   
      console.log(data)               
        if(data.status==false || data.status == 'false'){
          // el usuario acaba de participar
          // sumar a personas
          if(data.opcion<4){
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{personas:1}},(error,result)=>{
              if (error) { throw error }
            })
            console.log(`Incrementar personas en  bus ${data.bus}`)
          }else{
            //sumar a espacio
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{espacio:1}},(error,result)=>{
              if (error) { throw error }
            })
            console.log(`Incrementar espacio en  bus ${data.bus}`)
          }
          
        }else{          
          switch(data.opcionAnterior){
            case 1:
              Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion1:-1}},(error,result)=>{
                if (error){throw error}
              })
              break;
            case 2:
                Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion2:-1}},(error,result)=>{
                  if (error){throw error}
                })
              break;
            case 3:
                Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion3:-1}},(error,result)=>{
                  if (error){throw error}
                })
              break;
            case 4:
                Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion4:-1}},(error,result)=>{
                  if (error){throw error}
                })
              break;
            case 5:
                Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion5:-1}},(error,result)=>{
                  if (error){throw error}
                })
              break;
            case 6:
                Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion6:-1}},(error,result)=>{
                  if (error){throw error}
                })
              break;
            default:
              break;
          }          
        }
        switch(data.opcion){  
          case 1:              
                Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion1:1}},(error,result)=>{
                  if (error) { throw (error)}
                })                          
              break;
          case 2:
              Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion2:1}},(error,result)=>{
                if (error) { throw (error)}
              })
            break;
          case 3:
              Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion3:1}},(error,result)=>{
                if (error) { throw (error)}
              })
            break;
          case 4:
              Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion4:1}},(error,result)=>{
                if (error) { throw (error)}
              })
            break;
          case 5:
              Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion5:1}},(error,result)=>{
                if (error) { throw (error)}
              })
            break;
          case 6:
              Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion6:1}},(error,result)=>{
                if (error) { throw (error)}
              })
            break;
          default:
            break;
        }                 
      io.emit('enviar',{bus:data.bus,opcion:data.opcion,status:data.status,opcionAnterior:data.opcionAnterior});
    })    
});



  server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
