var express = require("express");
var userRoutes = express.Router();
var User = require("../models/user-schema");


userRoutes.route("/")

    .get(function (req, res) {

        User.findById(req.user._id)

            .populate("username")
            .exec(function (err, user) {
                if (err) return res.status(500).send(err);

                return res.send(user.username)
            });
    })

module.exports = userRoutes;