require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Initialize bodyParser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cookie-parser to parse cookies
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "*" }));

// const port = 3000;

app.use(express.json());

// View engine
app.set("view engine", "ejs");

// static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", require("./routes/home"));

// error middleware
app.use((req, res, next) => {
  res
    .status(404)
    .render("error/404", { title: "Page Not Found", path: "/404" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error/error", {
    title: "Server Error",
    path: "/error",
    message: err.message,
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000!");
});
