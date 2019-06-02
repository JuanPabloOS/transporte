let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/transporte', {useNewUrlParser: true});
let db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.on('error', (error)=>{
    console.log(error);
});

db.once('open', ()=>{
    console.log('Conectado a mongodb');
});