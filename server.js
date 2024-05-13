const express = require("express");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const db = require("./db.js");
const path = require("path");
const { init: initAuth } = require("./auth");

const app = express();
// const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.static("css"));
app.use(express.static(path.join(__dirname, "public")));

var os = require("os");

var networkInterfaces = os.networkInterfaces();

var address = networkInterfaces.WiFi[0].address;

// var address = networkInterfaces.wlan0[0].address;

initAuth();
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = address; // Your IP address

db.sync({ force: false }).then(() => {
  app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
  });
});
