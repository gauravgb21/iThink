var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var Post    = require('../models/posts');
var moment  = require('moment');

router.get('/',function(req,res){
	Post.find({userid : req.user._id}).exec(function(err,data){
	  if(err)throw err;
	  else{
	  	data.reverse();
	    res.render('dashboard',{
	    	posts : data
	    });
	  }
	});
});


module.exports = router;