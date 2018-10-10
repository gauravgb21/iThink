var express       = require('express');
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.get('/:userid',function(req,res){
	var user = {};
		
	User.find({username:req.params.userid},{_id:1,username:1,name:1,profession:1,city:1,country:1,birthday:1,imageUrl:1,following:1,followers:1},function(err,data){
		if(err)throw err;
		user._id        = data[0]._id;
		user.name       = data[0].name;
		user.profession = data[0].profession;
		user.city       = data[0].city;
		user.country    = data[0].country;
		user.birthday   = data[0].birthday;
		user.imageUrl   = data[0].imageUrl;
		user.username   = data[0].username;
		user.following  = data[0].following;
		user.followers  = data[0].followers;
		
		Posts.find({userid:user.username}).sort({"creation": -1}).exec(function(err,data){
			  if(err)throw err;
			  else{
			  	for(var i = 0;i < data.length; i++){
			  		var likedby = data[i].likedby;
			  		var index   = likedby.indexOf(req.user.username);
			  		if(index!=-1){
			  			data[i].isliked = 1;
			  		}
			  		else{
			  			data[i].isliked = 0;
			  		}
			  	}
			  	user["posts"] = data;
			    res.render('userprofile',{
		 	      _user:user
		        });
			  }
			});
		});

});

module.exports = router;