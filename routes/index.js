const express = require('express');

const routes = express.Router();

const passport = require('passport');

const Admin = require('../models/Admin');

const AdminController = require('../controllers/adminController');

routes.post('/register',AdminController.register);

routes.get("/allRecord",passport.authenticate('jwt', {failureRedirect : "/loginFailed"}), AdminController.allRecord);

routes.get("/loginFailed",async (req,res)=>{
    return res.json({status:200,msg:"First you have to login"});
})

routes.delete("/deleteRecord/:id", AdminController.deleteRecord);

routes.patch("/editRecord/:id",passport.authenticate('jwt', {failureRedirect : "/loginFailed"}), AdminController.editRecord);

routes.post("/login", AdminController.login);

routes.use("/faculty",require('./v1/faculty'));

module.exports = routes;