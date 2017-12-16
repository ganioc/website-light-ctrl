var http = require("http");
var express = require("express");
var handlebars = require("express3-handlebars");
var credentials = require('./lib/credentials.js');
var bodyParser = require("body-parser");

var app = express();

handlebars = handlebars.create({
    defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: true,
    secret: credentials.cookieSecret,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    // res.type("text/plain");
    // res.send("home page");
    //console.log(req.session.username);
    if (req.session.normalId === undefined) {
        res.render("home-visitor", { title: "未登录" });
    } else {
        res.render("home", { title: "主页" });
    }
});

app.get("/login", (req, res) => {
    // res.type("text/plain");
    // res.send("login page");
    res.render("elogin", { title: "登录" });
});

app.get("/logout", (req, res) => {
    if (req.session.normalId) {
        delete req.session.normalId;
    }
    res.redirect("/");
});

app.get("/error", (req, res) => {
    // res.type("text/plain");
    // res.send("error page");
    res.render("eerror", { title: "错误" });
});

app.post("/login", function (req, res) {
    //console.log(req);
    console.log(req.body);

    var bCheck = credentials.checkAuth(req.body.user, req.body.pass);

    if (bCheck === 1) {
        req.session.normalId = credentials.normalId;
        res.redirect("/");
    } else if (bCheck === 2) {
        req.session.normalId = credentials.adminId;
        res.redirect("/");
    } else {
        delete req.session.normalId;
        res.redirect("/error");
    }
});

app.use((req, res) => {
    res.status(404);
    //res.send("404");
    res.render("404", { title: "404 not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    //res.send("500");
    res.render("500", { title: "500 server error" });
});

app.listen(8080, "0.0.0.0", () => {
    console.log("Server started on port: 8080");
});





