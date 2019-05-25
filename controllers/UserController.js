const {User, Bus} = require('../models/models.js');

function signUp(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
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
    User.findOne({"username":req.body.username,"password":req.body.password},(error,result)=>{
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
module.exports={
    signUp,
    logIn,
    registrarBus,
    obtenerDatos
}