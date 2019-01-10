var express = require('express');
var router  = express.Router();
var User    = require('../models/user');

router.post('/',function(req,res){
	if(req.body.ubio.length!=0){
		User.update({_id:req.user._id},{$set: {bio:req.body.ubio}}).exec(function(err,data){
			if(err)throw err;
		});
	}
	res.redirect('/dashboard');
});

module.exports = router;