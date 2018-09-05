var express       = require('express');
var router        = express.Router();

router.get('/',function(req,res){
  var string = req.user.imageUrl;
  res.send(string);
});

module.exports = router;
