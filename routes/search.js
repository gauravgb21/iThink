var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.post('/',function(req,res){
  
  var name_to_search = req.body.search;
  console.log(name_to_search);
  User.find({name: new RegExp(name_to_search, 'i')},{name:1,profession:1,city:1,country:1,imageUrl:1,username:1},function(err,data){
    if(err)throw err;
    for(var i = 0;i < data.length; i++){
  		var following = req.user.following;
  		var index     = following.indexOf(data[i].username);
  		if(index!=-1){
  			data[i].isfriend = 1;
  		}
  		else{
  			data[i].isfriend = 0;
  		}
	  }
    for(var i = 0;i < data.length; i++){
      if(data[i].username == req.user.username){
        data.splice(i,1);
      }
    } 
    console.log("it should render");
    res.render('search',{
      data:data
    });
  });

});

module.exports = router;