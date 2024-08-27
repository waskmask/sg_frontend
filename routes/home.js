const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("home", {
    title: "Coming soon",
    path: "/",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Coming soon",
    path: "/register",
  });
});

module.exports = router;
