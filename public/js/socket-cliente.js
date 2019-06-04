var socket = io();
//id del usuario
var username = "";
//Contador del total de personas ue ha opinado
//sobre cada camión
var personasB1 = 0;
var personasB2 = 0;
var personasB1Espacio = 0;
var personasB2Espacio = 0;
//contador de las opciones seleccionadas por las personas
var contadorBus1 = [0,0,0];
var contadorBus2 = [0,0,0];
var contadorBus1Espacio = [0,0,0];
var contadorBus2Espacio = [0,0,0];
//Estas variables indican para cuál autobús ha opinado la persona
//si está en 1 significa que ha opinado para dicho autobús
//Ha opinado sobre si ya salió o no el autobus
var bus1 = 0
var bus2 = 0
// Ha opinado sobre si va lleno o no
var bus1Espacio=0
var bus2Espacio=0
//guarda el número de la opción ue ha seleccionado
var b1Estado=0
var b1Espacio=0
var b2Estado=0
var b2Espacio=0
//var para establecer horario
var horario = 0;

function establecerHorario(){
  var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    console.log(`La hora es ${h}:${m}`);
    if((h>=18 && m>=45)||(h==19&&m<15 ) ){//juriquilla 19:10   
      horario=1; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=18 && m>=0){// cu 18:30
      horario=2; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=17 && m>=0){//juriquilla 17:30
      horario=3; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=16 && m>=30){//cu 17:00
      horario=4; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=16 && m>=00){// juriquilla 16:30
      horario=5; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=15 && m>=30){//cu 16:00
      horario=6; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=15 && m>=00){//cu 15:30
      horario=7; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=14 && m>=30){//juriquilla  15
      horario=8; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=14 && m>=0){// cu 14:30
      horario=9; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=13 && m>=41){//juriquilla 14:10
      horario=10; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=13 && m>=10){//cu 13:40
      horario=11; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=12 && m>=33){//juriquilla 13:00 
     horario=12;
     sessionStorage.setItem("horario",horario);
     console.log(`Horario local ${horario}`)
    }else if(h>=11 && m>=0){//cu 12:30
      horario=13; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=10 && m>=30){//juriquilla 11:00
      horario=14; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if((h>=9 && m>=50)||(h==10 && m<=20)){//cu 10:20
      horario=15; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=8 && m>=0){//cu 8:30
      horario=16; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=7 && m>=0){//cu 7:30
      horario=17; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }else if(h>=6 && m>=0){// cu 6:30
      horario=18; 
      sessionStorage.setItem("horario",horario);
      console.log(`Horario local ${horario}`)
    }
}
window.onload=function(){
  console.log("============================")
    var session = sessionStorage.getItem("session");
    if(session){
      // console.log(`var session ${session}`);
        establecerHorario();
        console.log(`onload se estableció el horario ${horario}`)
        username = sessionStorage.getItem("username");
        document.getElementById("user").innerHTML=username;        
        obtenerYActualizar()                
    }else{        
        window.location.href = `/login`;        
    }    
}
function notificar(texto){
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

// Let's check whether notification permissions have already been granted
else if (Notification.permission === "granted") {
  // If it's okay let's create a notification
  var notification = new Notification(texto);
}

// Otherwise, we need to ask the user for permission
else if (Notification.permission !== 'denied') {
  Notification.requestPermission(function (permission) {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      var notification = new Notification(texto);
    }
  });
}

}

function obtenerYActualizar(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200) {                                    
            var respuesta = JSON.parse(this.responseText);                  
            //actualizar datos
            //contadores
            personasB1=respuesta['autobuses'][0]['personas']
            personasB1Espacio=respuesta['autobuses'][0]['espacio']
            //total opciones
            contadorBus1=[respuesta['autobuses'][0]['opcion1'],respuesta['autobuses'][0]['opcion2'],respuesta['autobuses'][0]['opcion3']];
            contadorBus1Espacio=[respuesta['autobuses'][0]['opcion4'],respuesta['autobuses'][0]['opcion5'],respuesta['autobuses'][0]['opcion6']];
            // lo mismo pero con el autobus 2
            personasB2=respuesta['autobuses'][1]['personas']
            personasB2Espacio=respuesta['autobuses'][1]['espacio']
            //total opciones
            contadorBus2=[respuesta['autobuses'][1]['opcion1'],respuesta['autobuses'][1]['opcion2'],respuesta['autobuses'][1]['opcion3']];
            contadorBus2Espacio=[respuesta['autobuses'][1]['opcion4'],respuesta['autobuses'][1]['opcion5'],respuesta['autobuses'][1]['opcion6']];
            llenarGraficas(1)
            llenarGraficas(2)
            if(localStorage.getItem("bus1")){
              bus1 = localStorage.getItem("bus1")
            }
            if(localStorage.getItem("bus2")){
              bus2 = localStorage.getItem("bus2")
            }
            if(localStorage.getItem("bus1Espacio")){
              bus1Espacio=localStorage.getItem("bus1Espacio")
            }
            if(localStorage.getItem("bus2Espacio")    ){
              bus2Espacio=localStorage.getItem("bus2Espacio")    
            }
            if(localStorage.getItem("b1Estado")){
              b1Estado = localStorage.getItem("b1Estado")
            }
            if(localStorage.getItem("b1Espacio")){
              b1Espacio = localStorage.getItem("b1Espacio")
            }
            if(localStorage.getItem("b2Estado")){
              b2Estado=localStorage.getItem("b2Estado")
            }
            if(localStorage.getItem("b2Espacio")){
              b2Espacio=localStorage.getItem("b2Espacio")
            }            
        }
    }
    http.open("POST","/transporte/obtenerDatos",true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
}

socket.on('reset',(data)=>{    
    document.getElementById("destino").innerHTML=data.horario;
    if(data.num!=sessionStorage.getItem("horario")){    
      establecerHorario();
      console.log(`cambio de horario ${data.horario}`);
      reset();
      notificar("Cambio de horario: " + data.horario);
    }    
})

function actualizar(bus,opcion){             
    if(bus==1 && opcion<4){
      if(bus1==0){
        socket.emit('inc',{
          bus: bus,
          opcion:opcion,         
      });      
      }else{
        socket.emit('dec',{
          bus: bus,
          opcion:opcion,          
          opcionAnterior:b1Estado
      });
      }
        bus1=1;
        window.localStorage.setItem("bus1",1);
        b1Estado=opcion;
        window.localStorage.setItem("b1Estado",opcion);        
    } 
    if(bus==1 && opcion>3){
      if(b1Espacio==0){
        socket.emit('inc',{
          bus: bus,
          opcion:opcion,
      })
      }else{
        socket.emit('dec',{
          bus: bus,
          opcion:opcion,          
          opcionAnterior:b1Espacio
      })
      }       
        bus1Espacio=1;
        window.localStorage.setItem("bus1Espacio",1);
        b1Espacio=opcion;
        window.localStorage.setItem("b1Espacio",opcion);
    } 
    if(bus==2 && opcion<4){
      if(bus2 == 0){
        socket.emit('inc',{
          bus: bus,
          opcion:opcion,
      })
      }else{
        socket.emit('dec',{
          bus: bus,
          opcion:opcion,
          status:bus2,
          opcionAnterior:b2Estado
      })
      }        
        bus2=1;
        window.localStorage.setItem("bus2",1);
        b2Estado=opcion;
        window.localStorage.setItem("b2Estado",opcion);
    }   
    if(bus==2 && opcion>3){
      if(bus2Espacio==0){
        socket.emit('inc',{
          bus: bus,
          opcion:opcion,          
          opcionAnterior:b2Espacio
      })
      }else{
        socket.emit('dec',{
          bus: bus,
          opcion:opcion,          
          opcionAnterior:b2Espacio
      })
      }        
        bus2Espacio=1;
        window.localStorage.setItem("bus2Espacio",1);
        b2Espacio=opcion;
        window.localStorage.setItem("b2Espacio",opcion);
    }    
    obtenerYActualizar();     
}

socket.on('enviar',()=>{
   obtenerYActualizar()
})

function llenarGraficas(bus){
    if(bus==1){
        if(contadorBus1[0]>personasB1){contadorBus1[0]=personasB1-1;}
        if(contadorBus1[1]>personasB1){contadorBus1[1]=personasB1-1;}
        if(contadorBus1[2]>personasB1){contadorBus1[2]=personasB1-1;}
        document.getElementById("b1-1").style.width = contadorBus1[0]*100/personasB1+"%"
        document.getElementById("b1-2").style.width = contadorBus1[1]*100/personasB1+"%"
        document.getElementById("b1-3").style.width = contadorBus1[2]*100/personasB1+"%"
        if(contadorBus1Espacio[0]>personasB1Espacio){contadorBus1Espacio[0]=personasB1Espacio-1;}
        if(contadorBus1Espacio[1]>personasB1Espacio){contadorBus1Espacio[1]=personasB1Espacio-1;}
        if(contadorBus1Espacio[2]>personasB1Espacio){contadorBus1Espacio[2]=personasB1Espacio-1;}
        document.getElementById("b1-4").style.width = contadorBus1Espacio[0]*100/personasB1Espacio+"%"
        document.getElementById("b1-5").style.width = contadorBus1Espacio[1]*100/personasB1Espacio+"%"
        document.getElementById("b1-6").style.width = contadorBus1Espacio[2]*100/personasB1Espacio+"%"
    }else{
        if(contadorBus2[0]>personasB2){contadorBus2[0]=personasB2-1;}
        if(contadorBus2[1]>personasB2){contadorBus2[1]=personasB2-1;}
        if(contadorBus2[2]>personasB2){contadorBus2[2]=personasB2-1;}
        document.getElementById("b2-1").style.width = contadorBus2[0]*100/personasB2+"%"
        document.getElementById("b2-2").style.width = contadorBus2[1]*100/personasB2+"%"
        document.getElementById("b2-3").style.width = contadorBus2[2]*100/personasB2+"%"
        if(contadorBus2Espacio[0]>personasB2Espacio){contadorBus2Espacio[0]=personasB2Espacio-1;}
        if(contadorBus2Espacio[1]>personasB2Espacio){contadorBus2Espacio[1]=personasB2Espacio-1;}
        if(contadorBus2Espacio[2]>personasB2Espacio){contadorBus2Espacio[2]=personasB2Espacio-1;}
        document.getElementById("b2-4").style.width = contadorBus2Espacio[0]*100/personasB2Espacio+"%"
        document.getElementById("b2-5").style.width = contadorBus2Espacio[1]*100/personasB2Espacio+"%"
        document.getElementById("b2-6").style.width = contadorBus2Espacio[2]*100/personasB2Espacio+"%"
    }
}
function reset(){    
    //Estas iables indican para cuál autobús ha opinado la persona
    //si está en 1 significa que ha opinado para dicho autobús
    //Ha opinado sobre si ya salió o no el autobus
    console.log("Se ejecuta reset");
    bus1 = 0
    bus2 = 0
    // Ha opinado sobre si va lleno o no
    bus1Espacio=0
    bus2Espacio=0   
    window.localStorage.setItem("bus1",0);
    window.localStorage.setItem("bus1Espacio",0);
    window.localStorage.setItem("bus2",0);
    window.localStorage.setItem("bus2Espacio",0);
    localStorage.setItem("b1Estado",0);
    localStorage.setItem("b1Espacio",0);
    localStorage.setItem("b2Estado",0);
    localStorage.setItem("b2Espacio",0);
    obtenerYActualizar();
    console.log("listo")
}
function cerrarSesion(){
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("username");
    window.location.href = `/login`;
}