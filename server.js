var express = require('express');
var app = express();
var router = express.Router();
// var mongodb = require("mongodb");
// var databaseUrl = "discoveries";
// var collections = ["contacts", "messages"];

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/app/public'));
app.use('/', require('./app/routing/html-routes.js'));

app.use('/api', require('./app/routing/api-routes.js'));

// app.post('/submit', function(req, res) {
//     console.log(req.body);
//     db.contacts.insert(req.body, function(err, saved) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.json(saved);
//         }
//     });
// });

// app.post('/send', function(req, res) {
//     console.log(req.body);
//     db.messages.insert(req.body, function(err, saved) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.json(saved);
//         }
//     });
// });

app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});