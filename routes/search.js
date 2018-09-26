var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.post('/',function(req,res){
  
  var name_to_search = req.body.search;
  User.find({name: new RegExp(name_to_search, 'i')},{name:1,profession:1,city:1,country:1,imageUrl:1,username:1},function(err,data){
    if(err)throw err;
    res.render('search',{
      data:data
    });
  });

});

module.exports = router;