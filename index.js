const express = require("express");

const path = require("path");

const Passport = require("passport");

const session = require("express-session");

const cookieParser = require("cookie-parser");

const db = require("./config/mongoose");

const PassportLocal = require("./config/passport-local-strategy");

const port = 8002;

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(
    session({
        name: "e-com",
        secret: "e-com",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
);

app.use(Passport.initialize());

app.use(Passport.session());

app.use(Passport.setAuth);

app.use(cookieParser());

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "assets")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/admin", require("./routes/admin"));

app.listen(port, (err) => {
    err
        ? console.log("Server not responding")
        : console.log(`Server respond successfully at port ${port}`);
});
