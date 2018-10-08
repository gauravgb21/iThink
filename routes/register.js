var express = require('express');
var User    = require('../models/user');
var router  = express.Router();

router.get('/',function(req,res){
   res.render('register');
});

router.post('/',function(req,res){
  var name        = req.body.name.toLowerCase();
  var username    = req.body.username;
  var email       = req.body.email;
  var password1   = req.body.password1;
  var password2   = req.body.password2;
  var profession  = req.body.profession.toLowerCase();
  var city        = req.body.city.toLowerCase();
  var country     = req.body.country.toLowerCase();
  var birthday    = req.body.birthday;
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
    name = name.split(' ');
    var newname = "";
    for(var i = 0;i < name.length; i++){
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
      newname+=name[i] + " "; 
    }
  	var newUser = User({
  		username:username,
  		password:password1,
  		email:email,
  		name:newname,
      profession:profession,
      city:city,
      country:country,
      birthday:birthday
  	});
  	newUser.save(function(err,data){
       if(err)
       	throw err;
      // console.log(data);
  	});
     
    // req.flash('success_msg','You are registered!');
     res.redirect('/login');
}
});

module.exports = router;