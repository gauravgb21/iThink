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
	},
	profession:{
		type:String
	},
	city:{
		type:String
	},
	country:{
		type:String
	},
	imageUrl:{
      type:String
	},
	birthday:{
		type:Date
	},
	searches:[
	{
	  _name:String,
	  _profession:String,
	  _city:String,
	  _country:String,
	  _imageUrl:String	
	}]
});
UserSchema.methods.validPassword=function(pwd){
return (this.password==pwd);
};
//Model the Schema
module.exports = mongoose.model('users',UserSchema);
