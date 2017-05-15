var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    type: String,
    ageRange: String,
    title: String,
    photos: [String],
    description: String,
    condition: String,
    price: {
        type: Number,
        required: true
    },
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
    },
    // username: {
    //     type: Schema.Types.string,
    //     ref: "User"
    // }   *** ask how to populate username ***

});

module.exports = mongoose.model("Item", itemSchema);
