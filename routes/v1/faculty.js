const express = require('express');

const routes = express.Router();
const passport = require('passport');

const facultyController = require('../../controllers/v1/facultyController');

routes.post("/facultyRegister",passport.authenticate('jwt',{failureRedirect: "/faculty/loginFailed"}) ,facultyController.FacultyRegister);

routes.get("/loginFailed",async (req,res)=>{
    return res.json({status:200,msg:"First you have to login"});
})

module.exports = routes;