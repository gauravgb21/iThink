var express       = require('express');
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.get('/:userid',function(req,res){
	var user = {};
		
	User.find({username:req.params.userid},{_id:1,name:1,profession:1,city:1,country:1,birthday:1,imageUrl:1},function(err,data){
		if(err)throw err;
		user._id        = data[0]._id;
		user.name       = data[0].name;
		user.profession = data[0].profession;
		user.city       = data[0].city;
		user.country    = data[0].country;
		user.birthday   = data[0].birthday;
		user.imageUrl   = data[0].imageUrl;
		console.log("first here");
		console.log(user);
		
		Posts.find({userid:user._id},{},function(err,data){
		   if(err)throw err;
		   user["posts"] = data;
		   console.log("here we go!");
		   console.log(user);
		   res.render('userprofile',{
			  _user:user
		   });
	    });

	});
});

module.exports = router;