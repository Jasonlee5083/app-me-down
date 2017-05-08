var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
		type: String,
		ageRange:String,
		title:String,
		photo:[],
		description:String,
		condition:String,
		location:String,
		email:String,
		donation: {
		type: Boolean,
		default: true
		},
    	user: {
        type: Schema.Types.ObjectId,
        ref: "User",
		required: true	
		}

});

module.exports = mongoose.model("Item", itemSchema);

