
var socket = io();
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
//si está en true significa que ha opinado para dicho autobús

//Ha opinado sobre si ya salió o no el autobus
var bus1 = false
var bus2 = false

// Ha opinado sobre si va lleno o no
var bus1Espacio=false
var bus2Espacio=false


//guarda el número de la opción ue ha seleccionado
var b1Estado = 0
var b1Espacio = 0

var b2Estado=0
var b2Espacio=0
//actualizar variables
window.onload=function(){
    obtenerYActualizar()
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
            bus1 = localStorage.getItem("bus1")
            bus2 = localStorage.getItem("bus2")
            bus1Espacio=localStorage.getItem("bus1Espacio")
            bus2Espacio=localStorage.getItem("bus2Espacio")            
        }
    }
    http.open("POST","/transporte/obtenerDatos",true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();


}

///esta funcion se recibe apenas se ingresa al servidor
socket.on('enviarDatos',(data)=>{
    console.log(JSON.parse(data.bus1[0]));
    console.log(JSON.parse(data.bus2[0]));
})

function marcarCeros(){
    bus1=false
    bus2=false
    bus1Espacio=false
    bus2Espacio=false
}
//esta función se manda llamar cuando se selecciona una opción
//la varibale bus indica si es el autobús 1 o 2
//la variable opción indica el estatus del camión


function actualizar(bus,opcion){             
    if(bus==1 && opcion<4){
        socket.emit('enviar',{
            bus: bus,
            opcion:opcion,
            status:bus1,
            opcionAnterior:b1Estado
        })
        bus1=true
        b1Estado=opcion
        window.localStorage.setItem("bus1",true)
    } 
    if(bus==1 && opcion>3){
        socket.emit('enviar',{
            bus: bus,
            opcion:opcion,
            status:bus1Espacio,
            opcionAnterior:b1Espacio
        })
        bus1Espacio=true
        window.localStorage.setItem("bus1Espacio",true)
        b1Espacio=opcion
    } 
    if(bus==2 && opcion<4){
        socket.emit('enviar',{
            bus: bus,
            opcion:opcion,
            status:bus2,
            opcionAnterior:b2Estado
        })
        bus2=true
        window.localStorage.setItem("bus2",true)
        b2Estado=opcion
    }   
    if(bus==2 && opcion>3){
        socket.emit('enviar',{
            bus: bus,
            opcion:opcion,
            status:bus2Espacio,
            opcionAnterior:b2Espacio
        })
        bus2Espacio=true
        window.localStorage.setItem("bus2Espacio",true)
        b2Espacio=opcion
        
    } 
    
    
}

// var personasB1 = 0;
// var personasB2 = 0;
// var personasB1Espacio = 0;
// var personasB2Espacio = 0;
socket.on('enviar',(data)=>{
   obtenerYActualizar()
})

//actualiza la gráficas
//recibe el número del autobús
function llenarGraficas(bus){
    if(bus==1){
        document.getElementById("b1-1").style.width = contadorBus1[0]*100/personasB1+"%"
        document.getElementById("b1-2").style.width = contadorBus1[1]*100/personasB1+"%"
        document.getElementById("b1-3").style.width = contadorBus1[2]*100/personasB1+"%"
        document.getElementById("b1-4").style.width = contadorBus1Espacio[0]*100/personasB1Espacio+"%"
        document.getElementById("b1-5").style.width = contadorBus1Espacio[1]*100/personasB1Espacio+"%"
        document.getElementById("b1-6").style.width = contadorBus1Espacio[2]*100/personasB1Espacio+"%"
    }else{
        document.getElementById("b2-1").style.width = contadorBus2[0]*100/personasB2+"%"
        document.getElementById("b2-2").style.width = contadorBus2[1]*100/personasB2+"%"
        document.getElementById("b2-3").style.width = contadorBus2[2]*100/personasB2+"%"
        document.getElementById("b2-4").style.width = contadorBus2Espacio[0]*100/personasB2Espacio+"%"
        document.getElementById("b2-5").style.width = contadorBus2Espacio[1]*100/personasB2Espacio+"%"
        document.getElementById("b2-6").style.width = contadorBus2Espacio[2]*100/personasB2Espacio+"%"
    }
}



// Enviar datos del usuario para el inicio de sesión
//verificar credenciales
//dar retroalimentación
function login(){
    var email = document.getElementById("email2").value;
    var pass = document.getElementById("pass2").value;
    var	http = new XMLHttpRequest();    
    http.onreadystatechange = function (){        
		if (http.readyState == 4 && http.status == 200) {                                    
            var respuesta = JSON.parse(this.responseText);   
            console.log(respuesta)         
            if(respuesta.status == 1){
                //alert(`¿UAQ's UP ${respuesta.nombre}?`);                  
                window.localStorage.setItem("id",respuesta.result["_id"]);
                console.log(localStorage.getItem("id"));              
                window.location.href = `/`;
            }
            if(respuesta.status == 0){                
                alert("No se ha podido iniciar sesión, verifica tus datos");
            }            
        }
    }
    //http.open("POST","http://localhost:3000/inicioSesion",true);
    http.open("POST","/transporte/login",true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("username="+email+"&password="+pass);    
}

//Enviar datos del usuario para su registro
//verificar si el correo está disponible
//dar retroalimentación
function registrar(){    
    var email=  document.getElementById("email").value;
    var pass=  document.getElementById("pass").value;    
    var	http = new XMLHttpRequest();    
    http.onreadystatechange = function (){        
		if (http.readyState == 4 && http.status == 200) {                                    
            var respuesta = JSON.parse(this.responseText);            
            if(respuesta.st == 1){
                alert("Ya estás registrado, bienvenido a UAQ's UP");
                location.reload();
            }
            if(respuesta.st == 0){                
                alert("correo no disponible");
            }            
        }
    }
    //http.open("POST","http://localhost:3000/registrar",true);
    http.open("POST","/registrar",true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("nombre="+nombre+"&email="+email+"&pass="+pass);
}

function cerrarSesion(){
    personasB1 = 0;
    personasB2 = 0;
    personasB1Espacio = 0;
    personasB2Espacio = 0;
    //contador de las opciones seleccionadas por las personas
    contadorBus1 = [0,0,0];
    contadorBus2 = [0,0,0];

    contadorBus1Espacio = [0,0,0];
    contadorBus2Espacio = [0,0,0];
    //Estas iables indican para cuál autobús ha opinado la persona
    //si está en true significa que ha opinado para dicho autobús

    //Ha opinado sobre si ya salió o no el autobus
    bus1 = false
    bus2 = false

    // Ha opinado sobre si va lleno o no
    bus1Espacio=false
    bus2Espacio=false   
    window.localStorage.setItem("bus1",false)
    window.localStorage.setItem("bus1Espacio",false)
    window.localStorage.setItem("bus2",false)
    window.localStorage.setItem("bus2Espacio",false)
    console.log("listo")
}