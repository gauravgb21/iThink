var express=require('express');
var router=express.Router();
var User=require('../models/user')
router.get('/register',function(req,res){
res.render('register');
});

router.get('/login',function(req,res){
res.render('login');
});

router.post('/register',function(req,res)
{
  var name=req.body.name;
  var username=req.body.username;
  var email=req.body.email;
  var password1=req.body.password1;
  var password2=req.body.password2;

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
  		name:name
  	});
  	newUser.save(function(err,data){
       if(err)
       	throw err;
       console.log(data);
  	});
     
     req.flash('success_msg','You are registered!');
     res.redirect('/users/login');
  }

});
module.exports=router;