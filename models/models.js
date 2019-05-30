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
    }
});

const BusSchema = new Schema({
    idBus:{
        type:Number,
        required:true
    },
    personas:{
        type:Number,
        required:true
    },
    espacio:{
        type:Number,
        required:true
    },
    opcion1:{
        type:Number
    },
    opcion2:{
        type:Number
    },
    opcion3:{
        type:Number
    },
    opcion4:{
        type:Number
    },
    opcion5:{
        type:Number
    },
    opcion6:{
        type:Number
    },
})

let User = mongoose.model('User', UserSchema);
let Bus = mongoose.model('Bus',BusSchema);
module.exports = {
    User,
    Bus
}