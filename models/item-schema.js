var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({

    type: {
        type: String,
        required: true
    },
    ageRange: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    price: String,
    place: {
		name: String,
		lat: Number,
		lng: Number
	},
    email: {
        type: String,
        required: true
    },
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
