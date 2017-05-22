var express = require("express");
var userRoutes = express.Router();
var User = require("../models/user-schema");
var Item = require("../models/item-schema");

userRoutes.route("/")

    .get(function (req, res) {

        User.findById(req.user._id)

            .populate("user")
            .exec(function (err, user) {
                if (err) return res.status(500).send(err);

                return res.send(user.username)
            });
    });

userRoutes.route("/my/items")

    .get(function (req, res) {
        Item.find({user: req.user._id}, function (err, items) {
            if (err) return res.status(500).send(err);
            res.send(items);
        })
    });

userRoutes.route("/my/favorites")

    .get(function (req, res) {
        console.log(req.user);
        Item.find({favoritedBy: req.user._id}, function (err, items) {
            if (err) return res.status(500).send(err);
            res.send(items);
        })
    });


module.exports = userRoutes;