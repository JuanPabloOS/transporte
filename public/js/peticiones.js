window.onload=function(){
    var session = sessionStorage.getItem("session");
    if(session){
        window.location.href = `/`;
    }
}
function modal(warning,advice){
    document.getElementById("warning").innerHTML = warning;
    document.getElementById("advice").innerHTML = advice;
    document.querySelector('#modal1').style.display='block';
    document.getElementById("modal1").className = "modal"
}
function advertencia(warning,advice){
    document.getElementById("warning2").innerHTML = warning;
    document.getElementById("advice2").innerHTML = advice;
    document.querySelector('#modal2').style.display='block';
    document.getElementById("modal2").className = "modal"
}
//Quitar espacios
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
                // alert("No se ha podido iniciar sesión, verifica tus datos");
                // document.querySelector('.modal').style.display='block';
                modal("No se pudo iniciar sesión","Revisa tus datos");                
                    // setTimeout(() => {
                    //     closeModal()
                    // }, 1800);
            }            
        }
    }
    //http.open("POST","http://localhost:3000/inicioSesion",true);
    var datos = {
        username:email,
        password:pass
    }
    datos = JSON.stringify(datos);
    http.open("POST","/transporte/login",true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // http.send("username="+email+"&password="+pass);   
    http.send('datos='+datos); 
}
//Enviar datos del usuario para su registro
//verificar si el correo está disponible
//dar retroalimentación
function registrar(){    
    var email=  document.getElementById("email").value;
    var pass=  document.getElementById("pass").value;  
    var verificarPass = document.getElementById("verificarPass").value;
    var msj = "";
    if(email.length < 5){
         msj = "Tu usuario debe tener por lo menos 5 caracteres";
    }
    if(pass.length<5 || verificarPass.length<5){
        if(msj!=""){
            msj="Tu usuario y contraseña deben tener por lo menos 5 caracteres";
        }else{
            msj ="Tu contraseña debe tener por lo menos 5 caracteres";
        }
    }
    if(msj==""){             
        if(pass != verificarPass){
            document.getElementById("verificarPass").style.border = "1px solid red";
            advertencia("Error de  Contraseña","Haz que coincidan las contraseñas");
                        setTimeout(() => {
                            closeModal2()
                        }, 2300);
        }else{
            var	http = new XMLHttpRequest();    
            http.onreadystatechange = function (){        
                if (http.readyState == 4 && http.status == 200) {                                    
                    var respuesta = JSON.parse(this.responseText);            
                    if(respuesta.status == 1){
                        // alert("Ya estás registrado"); 
                        //document.querySelector('.modal2').style.display='block';                                       
                        advertencia("Registro completado","Intenta iniciar sesión");
                        setTimeout(() => {
                            closeModal2()
                        }, 2500);
                    }
                    if(respuesta.status == 0){                
                        // alert("Registro fallido");
                        //document.querySelector('.modal3').style.display='block';
                            advertencia("Registro no completado","Revisa tus datos");
                            setTimeout(() => {
                            closeModal2()
                        }, 2500);
                    }            
                }
            }
            //http.open("POST","http://localhost:3000/registrar",true);
            http.open("POST","/transporte/signup",true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            datos = {
                username:email,
                password:pass
            }
            datos = JSON.stringify(datos);
            http.send("datos="+datos);
            }                
    }else{
        advertencia("Error de datos",msj);
            setTimeout(() => {
                closeModal2()
            }, 3000);
    }
        
}

function closeModal() {
    // document.querySelector('.modal').style.display='none';
    document.getElementById("modal1").className = "modalOut";
    setTimeout(function(){   
        document.getElementById("modal1").style.display="none";
    },1500)
}
function closeModal2() {
    document.getElementById("modal2").className = "modalOut";
    setTimeout(function(){   
        document.getElementById("modal2").style.display="none";
    },1500)
}
function closeModal3() {
    document.querySelector('.modal3').style.display='none';
}