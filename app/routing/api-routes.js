var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
// var MongoClient = require("mongodb").MongoClient;
var mongodb = require("mongodb");
// var url = "mongodb = //localhost: 27017/";
var uri = 'mongodb://kjaustin:203980@limitlessdiscoveries.com/discoveries';

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
var api = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.text());
api.use(bodyParser.json({ type: "application/vnd.api+json" }));

var books = [];
var title;
var author;
var image;
var link;

// var db = client.db("discoveries");
var contacts = db.collection("contacts");
var messages = db.collection("messages");

api.post("/inquiry", function(req, res) {

    let data = [
        {
            email: 'example@gmail.com',
            message: 'You Light Up My Life',
            firstName: 'Debby Boone'
        }
    ];

    mongodb.MongoClient.connect(uri, function(err, client) {
        if(err) throw err;

        messages.insert(data, function(err, result) {
            if(err) throw err;
        });
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