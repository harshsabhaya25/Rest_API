const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;

const ExtractStrategy = require('passport-jwt').ExtractJwt;

const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');

const opts = {
    jwtFromRequest : ExtractStrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey : "RNW"
}

passport.use(new jwtStrategy(opts,async function(payload,done){
      let AdminData = await Admin.findOne({email: payload.adminData.email});
      if(AdminData) {
         if(AdminData.password == payload.adminData.password){
            return done(null,AdminData);
         }
         else{
            return done(null,false);
         }
      }
      else{
        return done(null,false);
      }
}))



passport.serializeUser(function(user,done){
    console.log(user);
    return done(null,user.id);
})

passport.deserializeUser(async function(id,done){
    console.log("Deserialize");
    console.log(id);

    let AdminRecord = await Admin.findById(id);
    if(AdminRecord){
        return done(null,AdminRecord);
    }
    else{
        return done(null,false);
    }
})

module.exports = passport;