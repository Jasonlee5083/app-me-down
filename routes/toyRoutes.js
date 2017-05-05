var express = require("express");
var toyRouter = express.Router();
var Toy = require("../models/toy-schema");

toyRouter.route("/")
	.get(function (req, res) {
		Toy.find(function (err, toys) {
			if (err) res.status(500).send(err);
			res.send(toys)
		});
	})
	.post(function (req, res) {
		var toy = new Toy(req.body);
		toy.user = req.user;

		toy.save(function (err, newToy) {
			if (err) res.status(500).send(err);
			res.status(201).send(newToy);
		});
	});

toyRouter.route("/:toyId")
	.get(function (req, res) {
		//			Toy.find(function(err,toys){
		Toy.findById(req.params.toyId, function (err, toy) {
			if (err) res.status(500).send(err);
			if (!toy) res.status(404).send("No toy item found.");
			else res.send(toy);
		});
	})
	.put(function (req, res) {
		Toy.findByIdAndUpdate(req.params.toyId, req.body, {
			new: true
		}, function (err, toy) {
			if (err) res.status(500).send(err);
			res.send(toy);
		});
	})
	.delete(function (req, res) {
		Toy.findByIdAndRemove(req.params.toyId, function (err, toy) {
			if (err) res.status(500).send(err);
			res.send(toy);
		})
	});

module.exports = toyRouter;
