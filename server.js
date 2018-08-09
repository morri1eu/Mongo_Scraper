const mongoose = require('mongoose')
var express = require('express')
var exphbs = require('express-handlebars');

var bodyParser = require('body-parser')

var db = require("./models")
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var PORT = process.env.PORT ||3000;
//scraping tools
var request = require('request');
const cheerio = require('cheerio')

app.use(express.static("public"));


//handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const MONGODBURL = process.env.MONGODB_URI || "mongodb://localhost:27017/NYtimes";

mongoose.connect(MONGODBURL, { useNewUrlParser: true });
//home route
app.get('/', function (req, res) {
    request.get('https://www.nytimes.com/', function (error, respose, body) {
        var $ = cheerio.load(body);
        $("article").each(function (i, element) {
            var x;
            var article = {}
            article.title = $(this).children("h2.story-heading").children("a").text()
            article.link = $(this).children("h2.story-heading").children("a").attr("href")
            article.summary = $(this).children("p.summary").text()

            if (article.title.length > 1 && article.link.length > 1 && article.summary.length > 1) {
                db.Article.findOne({ title: article.title }).then(function (result) {
                    x = result
                    console.log(x)
                })
                if (x === undefined) {
                    db.Article.create(article)
                        .then(function (createdArticle) {
                            console.log(createdArticle)
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                }
                else { }
            }
            else { }
        })
        db.Article.find({}).then(function (data) {
            console.log("-----------------" + data)
            res.render("home", { Articles: data })
        })
    })


});

app.get("/saved", function (req, res) {
    db.Article.find({ saved: true }).then(result => res.render("saved", { Articles: result }))

})

app.put("/api/:id", function (req, res) {
    console.log(req.body)
    db.Article.findByIdAndUpdate(req.params.id, req.body, function (err, res) {
    }).then(result => res.json(result))
})

app.delete("/api", function (req, res) {
    db.Article.deleteMany({}, function (result) {
        res.json(result)
    })
})

app.listen(PORT, function () {
    console.log(`app listening on port:${PORT}`)
});