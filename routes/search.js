var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router        = express.Router();
var User          = require('../models/user');
var Posts         = require('../models/posts');

router.post('/',function(req,res){

 User.findByIdAndUpdate(req.user._id,
  { $set:{ searches :[]}},
  function(err,managerparent){
    if(err)
      throw err;
  });

 var name_to_search = req.body.search;
 if(name_to_search.length!=0){

 var cursor = User.find({ name: new RegExp( name_to_search, 'i')},{name:1,profession:1,city:1,country:1,imageUrl:1}).cursor();
 cursor.on('data',function(doc){
    var search_data={_name:doc.name,_profession:doc.profession,_city:doc.city,_country:doc.country,_imageUrl:doc.imageUrl};

    User.findByIdAndUpdate(req.user._id,
    {"$push":{"searches":search_data}},{"new":true,"upsert":true},
    function(err,managerparent){
    if(err)
      throw err;
    });

 });
 
 cursor.on('close',function(){
 res.render('search'); 
 });
}
else
{
  res.render('search'); 
}
});

module.exports = router;