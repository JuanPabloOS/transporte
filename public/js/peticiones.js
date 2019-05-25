
// // Enviar datos del usuario para el inicio de sesión
// //verificar credenciales
// //dar retroalimentación
// function login(){
   
//     var email = document.getElementById("email2").value;
//     var pass = document.getElementById("pass2").value;
//     var	http = new XMLHttpRequest();    
//     http.onreadystatechange = function (){        
// 		if (http.readyState == 4 && http.status == 200) {                                    
//             var respuesta = JSON.parse(this.responseText);   
//             console.log(respuesta)         
//             if(respuesta.status == 1){
//                 //alert(`¿UAQ's UP ${respuesta.nombre}?`);                  
//                 window.localStorage.setItem("id",respuesta.result["_id"]);
//                 console.log(localStorage.getItem("id"));              
//                 window.location.href = `/`;
//             }
//             if(respuesta.status == 0){                
//                 alert("No se ha podido iniciar sesión, verifica tus datos");
//             }            
//         }
//     }
//     //http.open("POST","http://localhost:3000/inicioSesion",true);
//     http.open("POST","/transporte/login",true);
//     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     http.send("username="+email+"&password="+pass);    
// }

// //Enviar datos del usuario para su registro
// //verificar si el correo está disponible
// //dar retroalimentación
// function registrar(){
    
//     var email=  document.getElementById("email").value;
//     var pass=  document.getElementById("pass").value;    
//     var	http = new XMLHttpRequest();    
//     http.onreadystatechange = function (){        
// 		if (http.readyState == 4 && http.status == 200) {                                    
//             var respuesta = JSON.parse(this.responseText);            
//             if(respuesta.st == 1){
//                 alert("Ya estás registrado, bienvenido a UAQ's UP");
//                 location.reload();
//             }
//             if(respuesta.st == 0){                
//                 alert("correo no disponible");
//             }            
//         }
//     }
//     //http.open("POST","http://localhost:3000/registrar",true);
//     http.open("POST","/registrar",true);
//     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     http.send("nombre="+nombre+"&email="+email+"&pass="+pass);
// }