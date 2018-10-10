var express = require('express');
var router  = express.Router();
var Posts   = require('../models/posts');


router.post('/',function(req,res){
	var postid = req.body.postid;
	var obj = {
		username:req.user.username,
		name:req.user.name,
		imageUrl:req.user.imageUrl,
		content:req.body.text
	};
	console.log("object");
	console.log(obj);
	Posts.update({_id: postid},{$push: {comments: obj}}).exec(function(err,data){
		if(err)throw err;
		console.log("comment added successfully");
	});
});

module.exports = router;