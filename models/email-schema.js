/**
 * Created by sim_one_n_only on 5/11/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var emailSchema = new Schema ({
    from: String,
    to: String,
    subject: String,
    text: String
});

module.exports = mongoose.model("Email", emailSchema);