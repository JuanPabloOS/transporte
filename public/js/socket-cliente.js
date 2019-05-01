var socket = io();
//Contador del total de personas para cada camión
var personasB1 = 0;
var personasB2 = 0;
//contador de las opciones seleccionadas por las personas
var contadorBus1 = [0,0,0];
var contadorBus2 = [0,0,0];

function actualizar(bus,opcion){
    socket.emit('enviar',{
        bus: bus,
        opcion:opcion
    })    
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

