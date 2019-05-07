var socket = io();
//Contador del total de personas ue ha opinado
//sobre cada camión
var personasB1 = 0;
var personasB2 = 0;
//contador de las opciones seleccionadas por las personas
var contadorBus1 = [0,0,0];
var contadorBus2 = [0,0,0];

//Estas variables indican para cuál autobús ha opinado la persona
//si está en true significa que ha opinado para dicho autobús
var bus1 = false
var bus2 = false
//guarda el número de la opción ue ha seleccionado
var bus1OpcionStatus = 0
var bus2OpcionPasajeros = 0


//esta función se manda llamar cuando se selecciona una opción
//la varibale bus indica si es el autobús 1 o 2
//la variable opción indica el estatus del camión
function actualizar(bus,opcion){  
    if(bus==1 && bus1==false){
        socket.emit('enviar',{
            bus: bus,
            opcion:opcion
        })
        bus1=true
    } 
    if(bus==2 && bus2==false){
        socket.emit('enviar',{
            bus: bus,
            opcion:opcion
        })
        bus2=true
    }   
    
    
}

socket.on('enviar',(data)=>{
    
    if(data.bus == 1){
        personasB1++
        switch(data.opcion){
            case 1:contadorBus1[0]++; break
            case 2:contadorBus1[1]++; break
            case 3:contadorBus1[2]++; break
            default: break
        }
    }else{
        personasB2++
        switch(data.opcion){
            case 1:contadorBus2[0]++;break
            case 2:contadorBus2[1]++;break
            case 3:contadorBus2[2]++;break
            default:break
        }
    }    
    llenarGraficas(data.bus)
})

//actualiza la gráficas
//recibe el número del autobús
function llenarGraficas(bus){
    if(bus==1){
        document.getElementById("b1-1").style.width = contadorBus1[0]*100/personasB1+"%"
        document.getElementById("b1-2").style.width = contadorBus1[1]*100/personasB1+"%"
        document.getElementById("b1-3").style.width = contadorBus1[2]*100/personasB1+"%"
    }else{
        document.getElementById("b2-1").style.width = contadorBus2[0]*100/personasB2+"%"
        document.getElementById("b2-2").style.width = contadorBus2[1]*100/personasB2+"%"
        document.getElementById("b2-3").style.width = contadorBus2[2]*100/personasB2+"%"
    }
}

