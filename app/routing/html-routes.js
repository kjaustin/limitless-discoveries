var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var html = express.Router();

html.use(bodyParser.json());
html.use(bodyParser.urlencoded({ extended: true }));
html.use(bodyParser.text());
html.use(bodyParser.json({ type: "application/vnd.api+json" }));

html.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

html.get("/learn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn.html"));
});

html.get("/connect", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/connect.html"));
});

html.get("/play", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play.html"));
});

html.get("/engage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage.html"));
});

html.get("/engage/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-login.html"));
});

html.get("/engage/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-home.html"));
});

html.get("/engage/payment", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/payment.html"));
});

html.get("/engage/selection", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-selection.html"));
});

html.get("/engage/details", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-details.html"));
});

html.get("/engage/course", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/course/engage-course.html"));
});

html.get("/engage/community", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-community.html"));
});

html.get("/engage/preschool", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-preschool.html"));
});

html.get("/engage/unitstudy", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-unitstudy.html"));
});

html.get("/engage/consulting", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/engage-consulting.html"));
});

html.get("/engage/course/curiosity", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/course/engage-curiosity.html"));
});

html.get("/engage/course/creativity", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/course/engage-creativity.html"));
});

html.get("/engage/course/confidence", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/engage/course/engage-confidence.html"));
});

html.get("/admin-login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/admin-login.html"));
});

html.get("/admin-home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/admin-home.html"));
});

html.get("/admin-send", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/admin-send.html"));
});

html.get("/admin-statistics", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/admin-statistics.html"));
});

html.get("/shop", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop.html"));
});

html.get("/shop/art", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/art.html"));
});

html.get("/shop/learning", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning.html"));
});

html.get("/shop/learning/charlotte-approach-materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/charlotte-approach-materials.html"));
});

html.get("/shop/learning/montessori-approach-materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/montessori-approach-materials.html"));
});

html.get("/shop/learning/textbook-approach-materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/textbook-approach-materials.html"));
});

html.get("/shop/learning/unit-approach-materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/unit-approach-materials.html"));
});

html.get("/shop/learning/unschool-approach-materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/unschool-approach-materials.html"));
});

html.get("/shop/learning/waldorf-approach-materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/waldorf-approach-materials.html"));
});

html.get("/shop/reading", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/reading.html"));
});

html.get("/shop/sensory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/sensory.html"));
});

html.get("/shop/STEM", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/STEM.html"));
});

html.get("/shop/toys", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/toys.html"));
});

html.get("/learn/state-requirements", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/stateRequirements.html"));
});

html.get("/learn/childhood-reading", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/childhoodReading.html"));
});

html.get("/learn/curriculum", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculumApproaches.html"));
});

html.get("/learn/curriculum/unit-study", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/unitStudy.html"));
});

html.get("/learn/curriculum/montessori", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/montessori.html"));
});

html.get("/learn/curriculum/living-literature", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/livingLiterature.html"));
});

html.get("/learn/curriculum/traditional-textbook", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/traditionalTextbook.html"));
});

html.get("/learn/curriculum/waldorf", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/waldorf.html"));
});

html.get("/learn/curriculum/unschooling", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/unschooling.html"));
});

html.get("/play/fine-motor", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/fineMotor.html"));
});

html.get("/play/gross-motor", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/grossMotor.html"));
});

html.get("/play/outdoor", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/outdoor.html"));
});

html.get("/play/arithmetic", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/arithmetic.html"));
});

html.get("/play/fine-art", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/fineArt.html"));
});

html.get("/play/literacy", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/literacy.html"));
});

html.get("/play/science", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/science.html"));
});

html.get("/play/logic", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play/logic.html"));
});

html.get("/unit-study/plan", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/unitStudy/plan.html"));
});

html.get("/unit-study/materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/unitStudy/materials.html"));
});

html.get("/unit-study/resources", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/unitStudy/resources.html"));
});

html.get("/unit-study/schedule", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/unitStudy/schedule.html"));
});

html.get("/montessori/plan", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/montessori/plan.html"));
});

html.get("/montessori/materials", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/montessori/materials.html"));
});

html.get("/montessori/resources", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/montessori/resources.html"));
});

html.get("/montessori/schedule", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/learn/curriculum/montessori/schedule.html"));
});

html.get("/shop/learning/textbook/language", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/textbook/textbook-language.html"));
});

html.get("/shop/learning/textbook/mathematics", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/textbook/textbook-math.html"));
});

html.get("/shop/learning/textbook/socialStudies", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/textbook/textbook-socialStudies.html"));
});

html.get("/shop/learning/textbook/science", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shop/learning/textbook/textbook-science.html"));
});

module.exports = html;