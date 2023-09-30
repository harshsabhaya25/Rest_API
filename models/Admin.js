const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
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
    faculty_id : {
        type : mongoose.Schema.Types.Array,
        ref : "Faculty",
        required : true
    }
});

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;