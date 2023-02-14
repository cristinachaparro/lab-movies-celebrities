const express = require("express");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

//rutas
//GET "/movies/create"
router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", {
      allNamesCelebrities: response,
    });
  } catch (error) {
    next(error);
  }
});

//POST "/movies/create"
router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET "/movies/movies"
router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find().select({ title: 1 });
    res.render("movies/movies.hbs", {
      allTitleMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params.id)

  try {

    const response = await Movie.findById(id).populate("cast")
    // console.log(response.cast)
    // const allNamesCelebritiesDetail = await Celebrity.findById(response.cast)
    // console.log(allNamesCelebritiesDetail)

    res.render("movies/movie-details.hbs", {
      detailMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
