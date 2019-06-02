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
horario = 0;
function reset(num){
  if(horario!=num){
    horario=num;
    Bus.updateMany({}, { $set: { personas:0,espacio:0,opcion1:0,opcion2:0,opcion3:0,opcion4:0,opcion5:0,opcion6:0 }},(error,res)=>{
      if(error){throw error}
      console.log(res)
    });
  }  
}

//crear el socket =============================================================
//usar socket.io
const socketIO = require('socket.io');
let io = socketIO(server);
io.on('connection', function(client){            
    //manejador de eventos
    
    function intervalFunc() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      console.log(`${h}-${m}`);
      if(h>=18 && m>=45){
        //juriquilla 19:10   
        reset(1);
        io.emit('reset',{horario:'Juriquilla - CU salida: 19:10',num:1});
      }else if(h>=18 && m>=0){
        // cu 18:30
        reset(2);
        io.emit('reset',{horario:'CU - Juriquilla salida: 18:30',num:2});
      }else if(h>=17 && m>=0){
        //juriquilla 17:30
        reset(3);
        io.emit('reset',{horario:'Juriquilla - CU salida: 17:30',num:3});
      }else if(h>=16 && m>=30){
        //cu 17:00
        reset(4);
        io.emit('reset',{horario:'CU - Juriquilla salida: 17:00',num:4});
      }else if(h>=16 && m>=00){
        // juriquilla 16:30
        reset(5);
        io.emit('reset',{horario:'Juriquilla - CU salida: 16:30',num:5});
      }else if(h>=15 && m>=30){
        //cu 16:00
        reset(6);
        io.emit('reset',{horario:'CU - Juriquilla salida: 16:00',num:6});
      }else if(h>=15 && m>=00){
        //cu 15:30
        reset(7);
        io.emit('reset',{horario:'CU - Juriquilla salida: 15:30',num:7});
      }else if(h>=14 && m>=30){
        //juriquilla  15
        reset(8);
        io.emit('reset',{horario:'Juriquilla - CU salida: 15:00',num:8});
      }else if(h>=14 && m>=0){
        // cu 14:30
        reset(9);
        io.emit('reset',{horario:'CU - Juriquilla salida: 14:30',num:9});
      }else if(h>=13 && m>=41){        
        //juriquilla 14:10
        reset(10);
        io.emit('reset',{horario:'Juriquilla - CU salida: 14:10',num:10});
      }else if(h>=13 && m>=10){
        //cu 13:40
        reset(11);
        io.emit('reset',{horario:'CU - Juriquilla salida: 13:40',num:11});
      }else if(h>=12 && m>=30){
       //juriquilla 13:00 
       reset(12);
       io.emit('reset',{horario:'Juriquilla - CU salida: 13:00',num:12});
      }else if(h>=12 && m>=0){
        //cu 12:30
        reset(13);
        io.emit('reset',{horario:'CU - Juriquilla salida: 12:30',num:13});
      }else if(h>=11 && m>=30){
        //juriquilla 11:00
        reset(14);
        io.emit('reset',{horario:'Juriquilla - CU salida: 11:00',num:14});
      }else if(h>=9 && m>=50){
        //cu 10:20
        reset(15);
        io.emit('reset',{horario:'CU - Juriquilla salida: 10:20',num:15});
      }else if(h>=8 && m>=0){
        //cu 8:30
        reset(16);
        io.emit('reset',{horario:'CU - Juriquilla salida: 8:30',num:16});
      }else if(h>=7 && m>=0){
        //cu 7:30
        reset(17);
        io.emit('reset',{horario:'CU - Juriquilla salida: 7:30',num:17});
      }else if(h>=6 && m>=0){
        // cu 6:30
        reset(18);
        io.emit('reset',{horario:'CU - Juriquilla salida: 6:00',num:18});
      }
    }
    intervalFunc();
    setInterval(intervalFunc, 60000);
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
