const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1/Apinode6");

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("Not connected");
        return false;
    }
    console.log("connected");
})

module.exports = db;