var express = require("express");
var app = express();
var path = require("path");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config");  
var expressJwt = require("express-jwt");
var multer = require("multer")



var port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", expressJwt({secret: config.secret}));

app.use("/api/items", require("./routes/item-routes"));




app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.database); 


app.use("/auth/change-password", expressJwt({secret: config.secret}));

app.use("/auth", require("./routes/auth-routes"));


app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});



