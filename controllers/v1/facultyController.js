const Faculty = require('../../models/Faculty');
const Admin  = require('../../models/Admin');

module.exports.FacultyRegister = async (req,res) =>{
    let FacultyData = await Faculty.create(req.body);
    if(FacultyData){
        let AdminData = await Admin.findById(req.body.admin_id);
        if(AdminData){
           
           await AdminData.faculty_id.push(FacultyData.id);
    
           await Admin.findByIdAndUpdate(AdminData.id,{faculty_id : AdminData.faculty_id});
           return res.json({status:200,'msg':"faculty Register"});
        }
    }
}