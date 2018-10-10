var express       = require('express');
var router        = express.Router();
var User          = require('../models/user');

router.get('/',function(req,res){
  User.find({_id: req.user._id},{followers:1},function(err,data){
    if(err)throw err;
    User.find({username: {"$in": data[0].followers}},{username:1,name:1,profession:1,city:1,country:1,imageUrl:1},function(err,data){
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
      res.render('followers',{
      data:data
    });
    }); 
  });

});

module.exports = router;