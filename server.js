require('dotenv').config();
var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGOLAB_URI, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + process.env.MONGOLAB_URI + '. ' + err);
    } else {
        console.log ('Succeeded connecting to: ' + process.env.MONGOLAB_URI);
    }
});

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/app/public'));
app.use('/', require('./app/routing/html-routes.js'));
app.use('/api', require('./app/routing/api-routes.js'));

app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});