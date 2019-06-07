const {User, Bus} = require('../models/models.js');

function signUp(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let newUser = new User();
    datos = JSON.parse(req.body.datos)
    newUser.username = datos['username'];
    newUser.password = datos['password'];
    
    newUser.save((error)=>{
        if(error){
            return res.json({
                status:0,
                msg:"No se registró este usuario",
                data:error
            });
        }else{
            res.json({
                status:1,
                msg:"Registro completado",
                data:[]
            })
        }
    })
}

function logIn(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("==========")
    const datos = JSON.parse(req.body.datos);
    console.log(datos['username'])
    User.findOne({"username":datos['username'],"password":datos['password']},(error,result)=>{
        if(error){
            return res.json({
                status : 0,
                msg : 'Ocurrió un error',
                data : []
            });
        }else {            
            if(result == null){
                res.json({
                    status:0
                })
            }else{                
                res.json({
                    status:1,
                    result
                })
            }
            
        }
    })
}

function registrarBus(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let newBus = new Bus();
    newBus.idBus=req.body.idBus;
    newBus.personas = 0;
    newBus.opcion1 = 0;
    newBus.opcion2 = 0;
    newBus.opcion3 = 0;
    newBus.opcion4 = 0;
    newBus.opcion5 = 0;
    newBus.opcion6 = 0;
    
    newBus.save((error)=>{
        if (error){
            return res.json({
                status:0,
                msg:'Autobús no registrado',
                data:error
            })
        }else{
            return res.json({
                status:1,
                msg:'Autobús registrado',
                data:[]
            })
        }
    })
}

function obtenerDatos(req,res){ 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Bus.find({},(error,result)=>{
        if (error){
            return null
        }else{
            return res.json({autobuses:result})
        }        
    })    
}

function datosUsuario(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    User.findOne({username:req.body.username},(error,result)=>{
        if (error) {
            return null;
        }else{            
            return res.json({usuario:result});
        }
    })
}

function usuarioDisponible(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const username = req.body.username;
    User.findOne({username:username},(error,result)=>{
        if(error){
            return null;
        }else{
            return res.json({username:result})
        }
        
    })
}
module.exports={
    signUp,
    logIn,
    registrarBus,
    obtenerDatos,
    datosUsuario,
    usuarioDisponible
}