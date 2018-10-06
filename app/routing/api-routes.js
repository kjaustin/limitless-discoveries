var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var api = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.text());
api.use(bodyParser.json({ type: "application/vnd.api+json" }));

var mongoose = require ("mongoose");

var contactSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    type: String
});

var messageSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    message: String
});

var newsletterSchema = new mongoose.Schema({
    title: String,
    newsletterType: String,
    sendDate: String,
    sendTime: String,
    content: String
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String
});

var User = mongoose.model('User', userSchema);
var Contact = mongoose.model('Contact', contactSchema);
var Message = mongoose.model('Message', messageSchema);
var Newsletter = mongoose.model('Newsletter', newsletterSchema);

var books = [];
var title;
var author;
var image;
var link;

api.use(passport.initialize());
api.use(passport.session());

passport.use(new LocalStrategy(function(username, pass, cb){
    console.log("Running passport");
    var hashedPass = bCrypt.hashSync(pass)
    User.findOne({
        username: username
    }).then(function(user, err){
        if (err) { 
            console.log(err);
            return cb(err); 
        }
        if (!user) { 
            console.log("does not exist");
            return cb(null, false); 
        }
        if (!bCrypt.compareSync(pass, user.password)){ 
            console.log("what's going on");
            return cb(null, false);
        }
        console.log(user);
        return cb(null, user);
    })
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id).then(function (user) {
        cb(null, user);
    });
});

api.use(function(req,res,next){
    if(req.user){
        res.locals.user = req.user.username
    }
    next()
});

api.get("/signinRoute", function(req, res){
    res.sendFile(path.join(__dirname, "../public/admin/admin-home.html"));
    console.log("Successfully signed in.");
});

api.post("/signin", passport.authenticate('local'),
    function(req, res) {
        console.log(req.user.username);
        var currentUser = JSON.stringify(req.user);
        res.redirect("/api/signinRoute");
        return res.end(currentUser);
});

api.get('/logout', function(req, res){
    req.logout();
});

api.post("/signup", function(req, res, next){
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(user){
        if(!user){
            User.create({
                username: req.body.username,
                password: bCrypt.hashSync(req.body.password)
            }).then(function(user){
                console.log("added to database");
                passport.authenticate('local'), function(req, res) {
                    res.redirect("/signupRoute");
                }
            })
        } else {
            res.send("user exists");
        }
    })
})

api.get("/signup", function(req, res){
    console.log("Successfully signed up.");
    res.redirect("/signinRoute");
});

api.post('/save-newsletter', function(req, res) {
    Newsletter.create(req.body, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    return res.json(req.body);
});

api.post('/submit', function(req, res) {
    console.log(req.body);

    Contact.create(req.body, function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    if(req.body.type === "engage") {
        Newsletter.findOne({
            title: "Welcome to Engage"
        }).then(function(data){
            console.log(data);
            var msg = {
                to: req.body.email,
                from: "support@limitlessdiscoveries.com",
                subject: 'Engage Program',
                text: "Engage",
                html: "<!DOCTYPE html><html><head><meta charset='UTF-8'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous'><link href='https://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet'><link href='https://fonts.googleapis.com/css?family=Dancing+Script|Lato' rel='stylesheet'></head><body>"
                + data.content + "<style>.orange-cursive {color: orange; font-family: Dancing Script;} .lato {font-family: Lato;} .roboto {font-family: Roboto;} .dancing {font-family: Dancing Script;}</style></body></html>"
            };

            sgMail.send(msg);
            return res.json(req.body);
        });
    } else {
         Newsletter.findOne({
            title: "Welcome to Limitless Discoveries"
        }).then(function(data){
            console.log(data);
            var msg = {
                to: req.body.email,
                from: "support@limitlessdiscoveries.com",
                subject: 'Limitless Discoveries',
                text: "Limitless Discoveries",
                html: "<!DOCTYPE html><html><head><meta charset='UTF-8'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous'><link href='https://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet'><link href='https://fonts.googleapis.com/css?family=Dancing+Script|Lato' rel='stylesheet'></head><body>"
                + data.content + "<style>.orange-cursive {color: orange; font-family: Dancing Script;} .lato {font-family: Lato;} .roboto {font-family: Roboto;} .dancing {font-family: Dancing Script;}</style></body></html>"
            };

            sgMail.send(msg);
            return res.json(req.body);
        });       
    }

});

api.post('/send', function(req, res) {
    console.log(req.body);

    Message.create(req.body, function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    var msg = {
        to: 'kjuliaaustin@gmail.com',
        from: req.body.email,
        subject: 'Website Inquiry',
        text: req.body.message,
        html: '<p>' + req.body.message + '</p><br>' + '<p>' + req.body.firstName,
    };
    sgMail.send(msg);
    console.log(msg);
    return res.json(msg);
});

api.get("/return-newsletter", function(req, res) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;

    Newsletter.find({
        sendDate: today
    }).then(function(data){
        var upcomingNewsletters = data;
        console.log(upcomingNewsletters);
        return res.json(upcomingNewsletters);
    });
});


api.get("/scrape/:level", function(req, res) {
    console.log("request received");
    var level = req.params.level;
    console.log(level);

    var url = 'https://www.goodreads.com/shelf/show/' + level;

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            books = [];
                
            $("div.elementList").each(function(l, element) {

                title = $(this).children(".left").children(".bookTitle").text();
                author = $(this).children(".left").find(".authorName").children().text();
                image = $(element).children(".left").children(".leftAlignedImage").children().attr("src");
                link = $(element).children(".left").children(".bookTitle").attr("href");

                books.push({
                    title: title,
                    author: author,
                    image: image,
                    link: "https://www.goodreads.com" + link
                });
                return l<23;
            });
        }
        console.log(books);
        return res.json(books);
    });
});

module.exports = books;
module.exports = api;