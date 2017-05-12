var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    type: String,
    ageRange: String,
    title: String,
    photo: [String],
    description: String,
    condition: String,
    place: {
		name: String,
		lat: Number,
		lng: Number
	},
    email: String,
    favoritedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
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
