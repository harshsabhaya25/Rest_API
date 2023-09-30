const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/mongoose');

const passportjwt = require('./config/passport-jwt-strategy');
const session = require('express-session');
const passport = require('passport');

app.use(express.urlencoded());



app.use(session({
    name : "JWTS",
    secret : "RNWDATA",
    saveUninitialized : false,
    resave : true,
    cookie :{
        maxAge : 60*100*100
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/",require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`something wrong`);
        return false;
    }

    console.log(`server is running on port:${port}`);
})