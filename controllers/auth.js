const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
  registerView: (req, res) => {
    res.render("register");
  },

  loginView: async (req, res) => {
    if (await User.findOne({ where: { username: "admin" } })) {
      res.render("login");
      return;
    } else {
      await User.create({
        username: "admin",
        password: bcrypt.hashSync("admin", 8),
      });
      res.render("login");
    }
  },

  registerUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render("register", { error: "Please fill all fields" });
    }

    if (await User.findOne({ where: { username } })) {
      return res.render("register", {
        error: "A user account already exists with this email",
      });
    }

    await User.create({ username, password: bcrypt.hashSync(password, 8) });

    res.redirect("login?registrationdone");
  },

  loginUser: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/?loginsuccess",
      failureRedirect: "/login?error",
    })(req, res);
  },

  logoutUser: (req, res) => {
    req.logout(() => res.redirect("/login?loggedout"));
  },
};
