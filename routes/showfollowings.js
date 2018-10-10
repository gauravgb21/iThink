var express       = require('express');
var router        = express.Router();
var User          = require('../models/user');

router.get('/',function(req,res){
  User.find({_id: req.user._id},{following:1},function(err,data){
    if(err)throw err;
    User.find({username: {"$in": data[0].following}},{username:1,name:1,profession:1,city:1,country:1,imageUrl:1},function(err,data){
      if(err)throw err;
      for(var i = 0;i < data.length; i++){
  		 data[i].isfriend = 1;
	  }
      res.render('followings',{
      data:data
    });
    }); 
  });

});

module.exports = router;