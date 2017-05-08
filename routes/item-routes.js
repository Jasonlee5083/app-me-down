var express = require("express");
var itemRouter = express.Router();
var Item = require("../models/item-schema");

itemRouter.route("/")
	.get(function (req, res) {
		Item.find(function (err, items) {
			if (err) res.status(500).send(err);
			res.send(items)
		});
	})
	.post(function (req, res) {
		var item = new Item(req.body);
		item.user = req.user;

		item.save(function (err, newitem) {
			if (err) res.status(500).send(err);
			res.status(201).send(newitem);
		});
	});

itemRouter.route("/:itemId")
	.get(function (req, res) {
		//			item.find(function(err,items){
		Item.findById(req.params.itemId, function (err, item) {
			if (err) res.status(500).send(err);
			if (!item) res.status(404).send("No itemfound.");
			else res.send(item);
		});
	})
	.put(function (req, res) {
		Item.findByIdAndUpdate(req.params.itemId, req.body, {
			new: true
		}, function (err, item) {
			if (err) res.status(500).send(err);
			res.send(item);
		});
	})
	.delete(function (req, res) {
		Item.findByIdAndRemove(req.params.itemId, function (err, item) {
			if (err) res.status(500).send(err);
			res.send(item);
		})
	});

module.exports = itemRouter;
