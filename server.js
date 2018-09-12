var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var collections = ["contacts", "messages"];
var uri = 'mongodb://kaustin:203980kj@ds155292.mlab.com:55292/discoveries';

var PORT = process.env.PORT || 3000;

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static(__dirname + '/app/public'));
app.use('/', require('./app/routing/html-routes.js'));

app.use('/api', require('./app/routing/api-routes.js'));

app.post('/submit', function(req, res) {
    // console.log(req.body);
    // db.contacts.insert(req.body, function(err, saved) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.json(saved);
    //     }
    // });
});

app.post('/send', function(req, res) {
    console.log(req.body);
    if (err) throw err;
    MongoClient.connect(uri, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', uri);
        }

        // db.collection("messages").insertOne(req.body, function (err, result) {
        //     if (err) throw err;
        //     console.log("1 Record Inserted");
        //     db.close();
        // });
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