var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	items:{
		type: String,
		ageRange:String,
		title:String,
		photo:[],
		descriptions:String,
		condition:String,
		location:String,
		email:String,
		
	},
	
	
	donation: {
		type: Boolean,
		required: true
	},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
		required: true	
	}

});

module.exports = mongoose.model("Item", itemSchema);

