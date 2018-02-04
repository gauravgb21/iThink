var express=require('express');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var router=express.Router();
var User=require('../models/user')
router.get('/register',function(req,res){
res.render('register');
});

router.get('/login',function(req,res){
res.render('login');
});

router.get('/dashboard',function(req,res){
res.render('dashboard');
});

router.post('/register',function(req,res)
{
  var name=req.body.name.toLowerCase();
  var username=req.body.username;
  var email=req.body.email;
  var password1=req.body.password1;
  var password2=req.body.password2;
  var profession=req.body.profession.toLowerCase();
  var city=req.body.city.toLowerCase();
  var country=req.body.country.toLowerCase();
  var birthday=req.body.birthday;
  //Validations
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Not a valid Email').isEmail();
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('password1','Password is required').notEmpty();
  req.checkBody('password2','Confirm Password field can not be empty').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password1);
  var errors=req.validationErrors();
  if(errors){
  	res.render('register',{
       errors:errors
  	});
  }
  else{
  	var newUser=User({
  		username:username,
  		password:password1,
  		email:email,
  		name:name,
      profession:profession,
      city:city,
      country:country,
      birthday:birthday
  	});
  	newUser.save(function(err,data){
       if(err)
       	throw err;
       console.log(data);
  	});
     
    // req.flash('success_msg','You are registered!');
     res.redirect('/users/login');
  }

});

//configuring my local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//sessions data to identify the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



router.post('/login',
  passport.authenticate('local',{successRedirect:'/users/dashboard',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
   res.redirect('/users/dashboard'); 
  });


router.get('/logout',function(req,res){
req.logout();
//req.flash('success_msg','You are logged out successfully');
res.redirect('/users/login');
});
module.exports=router;