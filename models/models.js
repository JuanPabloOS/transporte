const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db.js');
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    bus1:{
        type:Boolean,
        default:false,
        required: true
    },
    bus2:{
        type:Boolean,
        default:false,
        required: true
    },
    bus1Espacio:{
        type:Boolean,
        default: false,
        required:true
    },
    bus2Espacio:{
        type:Boolean,
        default: false,
        required:true
    },
    b1Estado:{
        type:Number,
        required:true,
        default:0
    },
    b2Estado:{
        type:Number,
        required:true,
        default:0
    },
    b1Espacio:{
        type:Number,
        required:true,
        default:0
    },
    b2Espacio:{
        type:Number,
        required:true,
        default:0
    }
});

const BusSchema = new Schema({
    idBus:{
        type:Number,
        required:true
    },
    personas:{
        type:Number,
        required:true,
        default:0
    },
    espacio:{
        type:Number,
        required:true,
        default:0
    },
    opcion1:{
        type:Number,
        required:true,
        default:0
    },
    opcion2:{
        type:Number,
        required:true,
        default:0
    },
    opcion3:{
        type:Number,
        required:true,
        default:0
    },
    opcion4:{
        type:Number,
        required:true,
        default:0
    },
    opcion5:{
        type:Number,
        required:true,
        default:0
    },
    opcion6:{
        type:Number,
        required:true,
        default:0
    },
})

let User = mongoose.model('User', UserSchema);
let Bus = mongoose.model('Bus',BusSchema);
module.exports = {
    User,
    Bus
}