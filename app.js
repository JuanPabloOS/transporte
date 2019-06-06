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
function establecerHorario(){
  var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    console.log(`${h}-${m}`);
    if((h>=18 && m>=45)||(h==19&&m<15 ) ){//juriquilla 19:10   
      horario=1; 
      console.log(`Horario local ${horario}`)
    }else if(h>=18 && m>=0){// cu 18:30
      horario=2; 
      console.log(`Horario local ${horario}`)
    }else if(h>=17 && m>=0){//juriquilla 17:30
      horario=3; 
      console.log(`Horario local ${horario}`)
    }else if(h>=16 && m>=30){//cu 17:00
      horario=4; 
      console.log(`Horario local ${horario}`)
    }else if(h>=16 && m>=00){// juriquilla 16:30
      horario=5; 
      console.log(`Horario local ${horario}`)
    }else if(h>=15 && m>=30){//cu 16:00
      horario=6; 
      console.log(`Horario local ${horario}`)
    }else if(h>=15 && m>=00){//cu 15:30
      horario=7; 
      console.log(`Horario local ${horario}`)
    }else if(h>=14 && m>=30){//juriquilla  15
      horario=8; 
      console.log(`Horario local ${horario}`)
    }else if(h>=14 && m>=0){// cu 14:30
      horario=9; 
      console.log(`Horario local ${horario}`)
    }else if(h>=13 && m>=41){//juriquilla 14:10
      horario=10; 
      console.log(`Horario local ${horario}`)
    }else if(h>=13 && m>=10){//cu 13:40
      horario=11; 
      console.log(`Horario local ${horario}`)
    }else if(h>=12 && m>=33){//juriquilla 13:00 
     horario=12;
     console.log(`Horario local ${horario}`)
    }else if(h>=12 && m>=0){//cu 12:30
      horario=13; 
      console.log(`Horario local ${horario}`)
    }else if(h>=11 && m>=30){//juriquilla 11:00
      horario=14; 
      console.log(`Horario local ${horario}`)
    }else if(h>=9 && m>=50){//cu 10:20
      horario=15; 
      console.log(`Horario local ${horario}`)
    }else if(h>=8 && m>=0){//cu 8:30
      horario=16; 
      console.log(`Horario local ${horario}`)
    }else if(h>=7 && m>=0){//cu 7:30
      horario=17; 
      console.log(`Horario local ${horario}`)
    }else if(h>=6 && m>=0){// cu 6:30
      horario=18; 
      console.log(`Horario local ${horario}`)
    }
}
establecerHorario();

function reset(num){
  if(horario!=num){
    horario=num;
    Bus.updateMany({}, { $set: { personas:0,espacio:0,opcion1:0,opcion2:0,opcion3:0,opcion4:0,opcion5:0,opcion6:0 }},(error,res)=>{
      if(error){throw error}
      // console.log(res)
    });
  }  
}

//crear el socket =============================================================
//usar socket.io
const socketIO = require('socket.io');
let io = socketIO(server);
io.on('connection', function(client){                    
    function intervalFunc() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      // console.log(`${h}-${m}`);
      if((h>=18 && m>=45)||(h==19&&m<15 ) ){
        //juriquilla 19:10   
        reset(1);
        io.emit('reset',{horario:'Juriquilla - CU salida: 19:10',num:1});
        // console.log(`Horario servidor 1`)
      }else if(h>=18 && m>=0){
        // cu 18:30
        reset(2);
        io.emit('reset',{horario:'CU - Juriquilla salida: 18:30',num:2});
        // console.log(`Horario servidor 2`)
      }else if(h>=17 && m>=0){
        //juriquilla 17:30
        reset(3);
        io.emit('reset',{horario:'Juriquilla - CU salida: 17:30',num:3});
        // console.log(`Horario servidor 3`)
      }else if(h>=16 && m>=30){
        //cu 17:00
        reset(4);
        io.emit('reset',{horario:'CU - Juriquilla salida: 17:00',num:4});
        // console.log(`Horario servidor 4`)
      }else if(h>=16 && m>=00){
        // juriquilla 16:30
        reset(5);
        io.emit('reset',{horario:'Juriquilla - CU salida: 16:30',num:5});
        // console.log(`Horario servidor 5`)
      }else if(h>=15 && m>=30){
        //cu 16:00
        reset(6);
        io.emit('reset',{horario:'CU - Juriquilla salida: 16:00',num:6});
        // console.log(`Horario servidor 6`)
      }else if(h>=15 && m>=00){
        //cu 15:30
        reset(7);
        io.emit('reset',{horario:'CU - Juriquilla salida: 15:30',num:7});
        // console.log(`Horario servidor 7`)
      }else if(h>=14 && m>=30){
        //juriquilla  15
        reset(8);
        io.emit('reset',{horario:'Juriquilla - CU salida: 15:00',num:8});
        // console.log(`Horario servidor 8`)
      }else if(h>=14 && m>=0){
        // cu 14:30
        reset(9);
        io.emit('reset',{horario:'CU - Juriquilla salida: 14:30',num:9});
        // console.log(`Horario servidor 9`)
      }else if(h>=13 && m>=41){        
        //juriquilla 14:10
        reset(10);
        io.emit('reset',{horario:'Juriquilla - CU salida: 14:10',num:10});
        // console.log(`Horario servidor 10`)
      }else if(h>=13 && m>=10){
        //cu 13:40
        reset(11);
        io.emit('reset',{horario:'CU - Juriquilla salida: 13:40',num:11});
        // console.log(`Horario servidor 11`)
      }else if(h>=12 && m>=33){
       //juriquilla 13:00 
       reset(12);
       io.emit('reset',{horario:'Juriquilla - CU salida: 13:00',num:12});
      //  console.log(`Horario servidor 12`)
      }else if(h>=11 && m>=0){
        //cu 12:30
        reset(13);
        io.emit('reset',{horario:'CU - Juriquilla salida: 12:30',num:13});
        // console.log(`Horario servidor 13`)
      }else if(h>=10 && m>=30){
        //juriquilla 11:00
        reset(14);
        io.emit('reset',{horario:'Juriquilla - CU salida: 11:00',num:14});
        // console.log(`Horario servidor 14`)
      }else if((h>=9 && m>=50)||(h==10 && m<=20)){
        //cu 10:20
        reset(15);
        io.emit('reset',{horario:'CU - Juriquilla salida: 10:20',num:15});
        // console.log(`Horario servidor 15`)
      }else if(h>=8 && m>=0){
        //cu 8:30
        reset(16);
        io.emit('reset',{horario:'CU - Juriquilla salida: 8:30',num:16});
        // console.log(`Horario servidor 16`)
      }else if(h>=7 && m>=0){
        //cu 7:30
        reset(17);
        io.emit('reset',{horario:'CU - Juriquilla salida: 7:30',num:17});
        // console.log(`Horario servidor 17`)
      }else if(h>=6 && m>=0){
        // cu 6:30
        reset(18);
        io.emit('reset',{horario:'CU - Juriquilla salida: 6:00',num:18});
        // console.log(`Horario servidor 18`)
      }
    }
    intervalFunc();
    setInterval(intervalFunc, 60000);
    client.on('inc',(data)=>{
      console.log(`Incremento ${data}`)   
      if(data.opcion<4){
        Bus.findOneAndUpdate({idBus:data.bus},{$inc:{personas:1}},(error,result)=>{
          if(error){throw error}
        })
      }else if(data.opcion>3){
        Bus.findOneAndUpdate({idBus:data.bus},{$inc:{espacio:1}},(error,result)=>{
          if(error){throw error}
        })
      }
      switch(data.opcion){
        case 1:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion1:1}},(error,result)=>{
              if(error){throw error}
            })
            break;
          case 2:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion2:1}},(error,result)=>{
             if(error){throw error}
            })
            break;
          case 3:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion3:1}},(error,result)=>{
              if(error){throw error}
            })
            break;
          case 4:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion4:1}},(error,result)=>{
              if(error){throw error}
            })
            break;
          case 5:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion5:1}},(error,result)=>{
              if(error){throw error}
            })
            break;
          case 6:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion6:1}},(error,result)=>{
              if(error){throw error}
            })
            break;
          default:
            break;    
      }
      io.emit("enviar");
    
    })    
    client.on('dec',(data)=>{
      //console.log(data);/
      switch(parseInt(data.opcionAnterior)){        
        case 1:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion1:-1}},(error,result)=>{
              if(error){throw error}
              // console.log(result)
            })
            break;
        case 2:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion2:-1}},(error,result)=>{
            if(error){throw error}
            // console.log(result)
          })
          break;
        case 3:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion3:-1}},(error,result)=>{
            if(error){throw error}
            // console.log(result)
          })
          break;
        case 4:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion4:-1}},(error,result)=>{
            if(error){throw error}
            // console.log(result)
          })
          break;
        case 5:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion5:-1}},(error,result)=>{
            if(error){throw error}
            // console.log(result)
          })
          break;
        case 6:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion6:-1}},(error,result)=>{
            if(error){throw error}
            // console.log(result)
          })
          break;
        default:
          break;        
      }
      switch(data.opcion){
        case 1:
            Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion1:1}},(error,result)=>{
              if(error){throw error}
            })
            break;
        case 2:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion2:1}},(error,result)=>{
            if(error){throw error}
          })
          break;
        case 3:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion3:1}},(error,result)=>{
            if(error){throw error}
          })
          break;
        case 4:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion4:1}},(error,result)=>{
            if(error){throw error}
          })
          break;
        case 5:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion5:1}},(error,result)=>{
            if(error){throw error}
          })
          break;
        case 6:
          Bus.findOneAndUpdate({idBus:data.bus},{$inc:{opcion6:1}},(error,result)=>{
            if(error){throw error}
          })
          break;
        default:
          break;        
      }
      io.emit("enviar");
    })
});



  server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
