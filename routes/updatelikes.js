var express = require('express');
var router  = express.Router();
var Posts   = require('../models/posts');

router.post('/',function(req,res){
	var postid = req.body.postid;
	var val    = req.body.val;
	if(val == 1){
		Posts.update({_id:postid},{$push: {likedby:req.user.username}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	else{
	    Posts.update({_id:postid},{$pull: {likedby:req.user.username}}).exec(function(err,data){
			if(err)throw err;
		});   	
	}
});

module.exports = router;