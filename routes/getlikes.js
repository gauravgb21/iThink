var express = require('express');
var router  = express.Router();
var Posts   = require('../models/posts');

router.post('/',function(req,res){
	var postid = req.body.postid;
    Posts.findById(postid,function(err,data){
    	res.send(JSON.stringify(data));
    });
});

module.exports = router;