window.onload=function(){
    var session = sessionStorage.getItem("session");
    if(session){
        window.location.href = `/`;
    }
}
document.getElementById("email").addEventListener("keypress", function(event){
    console.log("entró")
    // if (event.keyCode === 13) {
        // event.preventDefault();
        var entrada = document.getElementById("email");
        var cuerpotxt = entrada.value.replace(/\s/g, "");   
        document.getElementById("email").value = cuerpotxt;    
        //console.log(cuerpotxt)
    if(cuerpotxt != ""){
        //console.log(cuerpotxt) 
    }       
    // }    
});

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
                var id = localStorage.getItem("id");
                if(id){
                    localStorage.removeItem("bus1")
                    localStorage.removeItem("bus2")
                    localStorage.removeItem("bus1Espacio")
                    localStorage.removeItem("bus2Espacio")    
                    localStorage.removeItem("b1Estado")
                    localStorage.removeItem("b1Espacio")
                    localStorage.removeItem("b2Estado")
                    localStorage.removeItem("b2Espacio")
                }                  
                localStorage.setItem("id",respuesta.result["_id"]);
                sessionStorage.setItem("username",respuesta.result["username"]);
                console.log(localStorage.getItem("id")); 
                sessionStorage.setItem("session","1");                    
                
                //establecer valores          
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
    var verificarPass = document.getElementById("verificarPass").value;
    if(pass != verificarPass){
        document.getElementById("verificarPass").style.border = "1px solid red";
    }else{
        var	http = new XMLHttpRequest();    
        http.onreadystatechange = function (){        
            if (http.readyState == 4 && http.status == 200) {                                    
                var respuesta = JSON.parse(this.responseText);            
                if(respuesta.status == 1){
                    alert("Ya estás registrado");                                        
                }
                if(respuesta.status == 0){                
                    alert("Registro fallido");
                }            
            }
        }
        //http.open("POST","http://localhost:3000/registrar",true);
        http.open("POST","/transporte/signup",true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("&username="+email+"&password="+pass);
        }    
}

