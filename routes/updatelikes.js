var express = require('express');
var router  = express.Router();
var Posts   = require('../models/posts');

router.post('/',function(req,res){
	var postid = req.body.postid;
	var val    = req.body.val;
	Posts.findOneAndUpdate({_id:postid},{$inc: {'likes':val}}).exec(function(err,data){
		if(err)throw err;
		//console.log("likes updated");
	});
});

module.exports = router;