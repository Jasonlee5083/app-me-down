var express = require("express");
var app = express();
var path = require("path");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config");  
var expressJwt = require("express-jwt");



var port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", expressJwt({secret: config.secret}));

app.use("/api/toy", require("./routes/toyRoutes"));  




app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.database); 
//mongoose.connect("mongodb://localhost/toy", function(err){
//	if(err) throw err;
//	console.log("Successfully connected to the database");
//});

app.use("/auth", require("./routes/authRoutes"));  


app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});



