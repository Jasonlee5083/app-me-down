var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var toySchema = new Schema({
	item:{
		type: [String],
		required:true
	},
	donation: {
		type: Boolean,
		required: true,
	},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
		required: true	
	}

});

module.exports = mongoose.model("Toy", toySchema);