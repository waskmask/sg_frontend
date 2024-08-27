const express = require("express");
require("dotenv").config();
const router = express.Router();
router.get("/", (req, res) => {
  res.render("home", {
    title: "Coming soon",
    path: "/",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    API_URL : process.env.API_URL,
    title: "Coming soon",
    path: "/register",
  });
});

module.exports = router;
