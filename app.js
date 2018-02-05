var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var flash=require('connect-flash');
var session=require('express-session');
var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
var mongo=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db=mongoose.connection;


//Routes
var routes=require('./routes/index');
var users=require('./routes/users');


//Init app
var app=express();

//view Engine
HandlebarsIntl.registerWith(Handlebars);

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');


//bodyParser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//static folders
app.use(express.static(path.join(__dirname,'public')));


app.use(cookieParser());
//Express sessions
app.use(session({
 secret: 'secret',
 saveUninitialized: true,
 resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validators
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//Global Variables
app.use(function(req,res,next){
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
res.locals.error=req.flash('error');
res.locals.user=req.user||null;
if(res.locals.user!=null)
{
  var arr=res.locals.user.posts;
  var post=[];
  for(var i=arr.length-1;i>=0;i--)
  {
     post.push(arr[i]);
  }
  res.locals.user.posts=post;
}
next();
});

//connect routes middlewares
app.use('/',routes);
app.use('/users',users);

//connect app 

app.listen(8081,function(){
	console.log('server is listing to 8081');
});