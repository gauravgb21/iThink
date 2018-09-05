var express       = require('express');
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.post('/',function(req,res){
var imageUrl=req.body.value;
User.findByIdAndUpdate(req.user._id,
  { $set:{"imageUrl":imageUrl}},
  function(err,managerparent){ 
    if(err)
      throw err;
  });
});

module.exports = router;