var mongoose=require('mongoose');

//define schema
var PostSchema=mongoose.Schema({
	userid:{
		type:String,
		index:true
	},
	name:{
        type:String
	},
	imageUrl:{
      type:String
	},
	creation:{
		type:String
	},
	text:{
		type:String
	},
	title:{
		type:String
	},
    likedby:[{
    	type:String
    }],
    comments:[{
    	username:{type:String},
    	name:{type:String},
    	imageUrl:{type:String},
    	content:{type:String}
    }],
    sharedby:[{
    	type:String
    }],
	tags:[{
		type:String
	}]
});
//Model the Schema
module.exports=mongoose.model('posts',PostSchema);
