var express          =   require('express');
var path             =   require('path');
var cookieParser     =   require('cookie-parser');
var bodyParser       =   require('body-parser');
var exphbs           =   require('express-handlebars');
var expressValidator =   require('express-validator');
var passport         =   require('passport');
var LocalStrategy    =   require('passport-local').Strategy;
var flash            =   require('connect-flash');
var session          =   require('express-session');
var Handlebars       =   require('handlebars');
var HandlebarsIntl   =   require('handlebars-intl');
var mongo            =   require('mongodb');
var mongoose         =   require('mongoose');
var port             =   process.env.PORT || 8081;
mongoose.connect('mongodb://localhost/loginapp');
var db               =   mongoose.connection;


//Routes
var index            =   require('./routes/index');
var blogimg          =   require('./routes/blogimg');
var blogname         =   require('./routes/blogname');
var blogpost         =   require('./routes/blogpost');
var dashboard        =   require('./routes/dashboard');
var logout           =   require('./routes/logout');
var login            =   require('./routes/login');
var profileupdate    =   require('./routes/profileupdate');
var register         =   require('./routes/register');
var search           =   require('./routes/search');
var updatelikes      =   require('./routes/updatelikes');
var getlikes         =   require('./routes/getlikes');
var userprofile      =   require('./routes/userprofile');
var addfriend        =   require('./routes/addfriend');
var removefriend     =   require('./routes/removefriend');
var addcomment       =   require('./routes/addcomment');
var showfollowers    =   require('./routes/showfollowers');
var showfollowings   =   require('./routes/showfollowings');
var updatedetails    =   require('./routes/updatedetails');
var updatebio        =   require('./routes/updatebio');
 //Init app
var app=express();

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

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
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg   = req.flash('error_msg');
res.locals.error       = req.flash('error');
res.locals.user        = req.user||null;
next();
});

//Handle routes
app.use('/',index);
app.use('/blog_img',blogimg);
app.use('/blog_name',blogname);
app.use('/blog_post',blogpost);
app.use('/dashboard',dashboard);
app.use('/login',login);
app.use('/logout',logout);
app.use('/profileupdate',profileupdate);
app.use('/register',register);
app.use('/search',search);
app.use('/updatelikes',updatelikes);
app.use('/getlikes',getlikes);
app.use('/userprofile',userprofile);
app.use('/addfriend',addfriend);
app.use('/removefriend',removefriend);
app.use('/addcomment',addcomment);
app.use('/showfollowers',showfollowers);
app.use('/showfollowings',showfollowings);
app.use('/updatedetails',updatedetails);
app.use('/updatebio',updatebio);
//connect app 

app.listen(port,function(){
	console.log('server is listing to 8081');
});