var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.post('/',function(req,res){
var post     = req.body.value;
var title    = req.body.title;
post         = post.replace(/\r?\n/g,'<br />');
title        = title.replace(/\r?\n/g,'<br />');
var date     = new Date();
var creation = date.toDateString(); 
var newPost  = Posts({
  userid:req.user.username,
  name:req.user.name,
  imageUrl:req.user.imageUrl,
  creation:Date(),
  text:post,
  title:title,
  tags:["No Tags"] 
});

newPost.save(function(err,data){
  if(err)throw err;
  //console.log(data);
});
});

module.exports = router;
