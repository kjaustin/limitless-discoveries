var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require("mongodb").MongoClient;
var databaseUrl = "discoveries";
var collections = ["contacts", "messages"];
var uri = 'mongodb://kjuliaaustin@gmail.com:Adeline4201@ds155292.mlab.com:55292/discoveries';

var PORT = process.env.PORT || 3000;

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
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
    if (err) throw err;
    db.collection("messages").insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log("1 Record Inserted");
        db.close();
    });

    var msg = {
        to: 'kjuliaaustin@gmail.com',
        from: data.email,
        subject: 'Website Inquiry',
        text: data.message,
        html: '<p>' + data.message + '</p><br>' + '<p>' + data.firstName,
    };
    sgMail.send(msg);

});

app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});