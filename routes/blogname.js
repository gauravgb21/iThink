var express       = require('express');
var router        = express.Router();

router.get('/',function(req,res){
  var string = req.user.name;
  res.send(string);
});

module.exports = router;
