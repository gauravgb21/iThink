var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var flash=require('connect-flash');

var routes=require('./routes/index');
var users=require('./routes/users');


//Init app
var app=express();

//view Engine

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');


//bodyParser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
