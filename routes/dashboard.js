var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var Post    = require('../models/posts');
var moment  = require('moment');

router.get('/',function(req,res){
	Post.find({
	    "$or": [{
	        "userid": req.user.username
	    }, {
	        "userid": {"$in": req.user.following}
	    }]
    }).sort({"creation": 1}).exec(function(err,data){
	  if(err)throw err;
	  else{
	  	data.reverse();
	  	for(var i = 0;i < data.length; i++){
	  		
	  	}
	    res.render('dashboard',{
	    	posts : data
	    });
	  }
	});
	// Post.find({userid : req.user._id}).exec(function(err,data){
	//   if(err)throw err;
	//   else{
	//   	data.reverse();
	//   	for(var i = 0;i < data.length; i++){
	  		
	//   	}
	//     res.render('dashboard',{
	//     	posts : data
	//     });
	//   }
	// });
});


module.exports = router;