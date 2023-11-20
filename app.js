const express = require("express");
const fileupload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();

// routers
const recipeRouter = require("./routes/recipeRoutes");

// Static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.use(cookieParser("cooking-blog-secret"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "cooking-blog-secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(fileupload());

app.set("view engine", "ejs");

app.set("layout", "./layouts/main");

// set view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", recipeRouter);

module.exports = app;
