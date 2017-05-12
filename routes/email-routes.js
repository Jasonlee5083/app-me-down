/**
 * Created by sim_one_n_only on 5/11/17.
 */
var express = require("express");
var emailRouter = express.Router();
var Email = require("../models/email-schema");
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

emailRouter.post("/send-email", function (req, res) {
    var options = {
        auth: {
            api_key: "AtPkigX1RkaxQ_hLRFGuOg"
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function (err, info) {
        if(err) {
            res.status("401").json({err: info});
        } else {
            res.status("200").json({success: true});
        }
    });
});

module.exports = emailRouter;