const mongoose = require('mongoose');

const FacultySchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    admin_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    }
});

const Faculty = mongoose.model('Faculty',FacultySchema);

module.exports = Faculty;