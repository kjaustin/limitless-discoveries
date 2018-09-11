var express = require('express');
var app = express();
var router = express.Router();
var mongojs = require("mongojs");
var databaseUrl = "discoveries";
var collections = ["contacts", "messages"];
var dns = require('dns');
var w3 = dns.lookup('www.limitlessdiscoveries.com', function (err, addresses, family) {
  console.log(addresses);
});

var PORT = process.env.PORT || 3000;

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.use(express.static(__dirname + '/app/public'));
app.use('/', require('./app/routing/html-routes.js'));

app.use('/api', require('./app/routing/api-routes.js'));

app.post('/submit', function(req, res) {
    console.log(req.body);
    db.contacts.insert(req.body, function(err, saved) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(saved);
        }
    });
});

app.post('/send', function(req, res) {
    console.log(req.body);
    db.messages.insert(req.body, function(err, saved) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(saved);
        }
    });
});

app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});