var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var Post    = require('../models/posts');

router.post('/',function(req,res){
	User.update({_id: req.user._id},{$pull: {following: req.body.userid}}).exec(function(err,data){
		if(err)throw err;
	});
	User.update({username: req.body.userid},{$pull: {followers: req.user.username}}).exec(function(err,data){
		if(err)throw err;
	});
});

module.exports = router;