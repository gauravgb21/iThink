var mongoose=require('mongoose');

//define schema
var PostSchema=mongoose.Schema({
	userid:{
		type:String,
		index:true
	},
	creation:{
		type:String
	},
	likes:{
		type:Number
	},
	shares:{
		type:Number
	},
	text:{
		type:String
	},
	title:{
		type:String
	},
	tags:[{
		type:String
	}]
});
//Model the Schema
module.exports=mongoose.model('posts',PostSchema);
