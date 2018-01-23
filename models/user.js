var mongoose=require('mongoose');

//define schema
var UserSchema=mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	password:{
		type:String
	},
	email:{
		type:String
	},
	name:{
		type:String
	}
});

//Model the Schema
module.exports=mongoose.model('user',UserSchema);;