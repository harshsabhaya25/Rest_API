const Admin = require('../models/Admin');

const jwtData = require('jsonwebtoken');

module.exports.register = async (req,res) =>{
    console.log("Admin controller");
    let alreadyExit = await Admin.findOne({email : req.body.email});
    if(alreadyExit){
        return res.json({'status':200,'msg':"Email already exist"});
    }
    else{
        
        let AdminData = await Admin.create(req.body);
        if(AdminData){
            return res.json({'status':200,'msg':"Register Successfully"});
        }
        else{
            return res.json({'status':400,'msg':"something wrong"});
        }
    }
    
}

module.exports.allRecord = async (req,res) =>{
  let AdminData = await Admin.find({}).populate('faculty_id').exec();
  return res.json({status:200,data:AdminData});

}

module.exports.deleteRecord = async (req,res) =>{
    let alreadyExit = await Admin.findOne({email : req.body.email});
    if(alreadyExit)
    {
        let AdminDelete = await Admin.findByIdAndDelete(req.params.id);
        if(AdminDelete){
            return res.json({'status':200,'msg':"Record deleted Successfully",record : AdminDelete});
        }
        else{
            return res.json({'status':400,'msg':"something wrong"});
        }
    }
    else{
        return res.json({'status':200,'msg':"Record not Found"});
    }
   
}

module.exports.editRecord = async (req,res) =>{
    console.log(req.params.id);
    let alreadyExit = await Admin.findById(req.params.id);
    if(alreadyExit){
        let editReco  = await Admin.findByIdAndUpdate(alreadyExit.id, req.body);
        if(editReco){
            return res.json({status:200,msg : "Record updated "});
        }
        else{
            return res.json({status:400,msg : "Something wrong"});
        }
    }
    else{
        return res.json({status:400,msg : "Record not Found"});
    }
    console.log(req.body);
}

module.exports.login = async (req,res) =>{
    // console.log(req.body);
    let checkAdmin = await Admin.findOne({email : req.body.email});
    if(checkAdmin){
        if(checkAdmin.password==req.body.password){
            let token =jwtData.sign({'adminData':checkAdmin},'RNW',{expiresIn : 86400});
            return res.json({status:200, token:token})
        
        }
        else{
            return res.json({status:200,msg : "Password not match"});
        }
    }
    else{
        return res.json({status:200,msg : "Invalid email"});
    }
}
