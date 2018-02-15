var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
	//console.log(res.user);
	res.render('login');
});

module.exports=router;