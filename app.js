const express = require("express");
var cookieParser = require('cookie-parser');

const app = express();
const static = express.static(__dirname + "/public");

// app.use(session({
//     name: 'AuthCookie',
//     secret: 'some secret string!',
//     resave: false,
//     saveUninitialized: true
// }))
app.use(cookieParser());
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "" }));
app.set("view engine", "handlebars");

configRoutes(app);



app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});

