var express = require("express");
var itemRouter = express.Router();
var Item = require("../models/item-schema");
var multer = require("multer");


itemRouter.route("/")
    .get(function (req, res) {
        var filter = {};
        if (req.query.user === "currentUser") {
            filter.user = req.user._id;
        }
        if(req.query.favoritedBy === "currentUser") {
            filter.favoritedBy = req.user._id;
        }
        Item.find(filter)
            .populate("user")
            .exec(function (err, items) {
                if (err) res.status(500).send(err);
                res.send(items)
            });
    });

// Setting up multer settings for images post
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        var origNameArr = file.originalname.split(".");
        console.log(origNameArr[0]);

        cb(null, origNameArr[0] + '-' + datetimestamp + '.' + origNameArr[origNameArr.length - 1]);
    }
});

var upload = multer({storage: storage}).any();

itemRouter.route("/")
    .post(upload, function (req, res) {
            var filenames = req.files.map(function(file) {
                return file.filename;
            });
            var item = new Item(req.body.data);
            item.photos = filenames;
            item.user = req.user;

            item.save(function (err, newitem) {
                if (err) return res.status(500).send(err);
                Item.populate(newitem, {path: "user"}, function(err, item) {
                    res.status(201).send(newitem);
                })
            });
        });

itemRouter.route("/:itemId")
    .get(function (req, res) {
        //			if(req.query.favorite === true
        Item.findById(req.params.itemId, function (err, item) {
            if (err) return res.status(500).send(err);
            if (!item) return res.status(404).send("No item found.");
            else res.send(item);
        });
    })
    .put(function (req, res) {
        Item.findByIdAndUpdate(req.params.itemId, req.body, {
            new: true
        }, function (err, item) {
            if (err) return res.status(500).send(err);
            res.send(item);
        });
    })
    .delete(function (req, res) {
        Item.findByIdAndRemove(req.params.itemId, function (err, item) {
            if (err) return res.status(500).send(err);
            res.send(item);
        })
    });
//itemRouter.route("/:itemId/items/")
//    .post(function (req, res) {
//        Item.findByIdAndUpdate(req.params.itemId, {$addToSet: {"user": req.user._id}}, {new: true}, function (err, item) {
//            if (err) return res.status(500).send(err);
//            if (!item) return res.status(404).send("Item not found.");
//            else {
//                res.send(item);
//            }
//        })
//    })
//	.put(function (req, res) {
//       Item.findByIdAndUpdate(req.params.itemId, {$pull: {"user": req.user._id}}, function (err, item) {
//           if(err) return res.status(500).send(err);
//           if(!item) return res.status(404).send("Item not found.");
//           else {
//
//               res.send(item);
//           }
//       })
//   })

itemRouter.route("/:itemId/favorites/")
    .post(function (req, res) {
        Item.findByIdAndUpdate(req.params.itemId, {$addToSet: {"favoritedBy": req.user._id}}, {new: true}, function (err, item) {
            if (err) return res.status(500).send(err);
            if (!item) return res.status(404).send("Item not found.");
            else {
                res.send(item);
            }
        })
    })
	.put(function (req, res) {
       Item.findByIdAndUpdate(req.params.itemId, {$pull: {"favoritedBy": req.user._id}}, function (err, item) {
           if(err) return res.status(500).send(err);
           if(!item) return res.status(404).send("Item not found.");
           else {

               res.send(item);
           }
       })
   })
	.delete(function (req, res) {
        Item.findByIdAndRemove(req.params.itemId, function (err, item) {
            if (err) return res.status(500).send(err);
            res.send(item);
        })
    })
	
	;


module.exports = itemRouter;
