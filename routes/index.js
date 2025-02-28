const express = require("express");
const router = express.Router();
// const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebritiesRoutes = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRoutes)

const moviesRoutes = require("./movies.routes.js")
router.use("/movies", moviesRoutes)

module.exports = router;
