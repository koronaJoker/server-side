import express from "express";

import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    renderMovies,
    renderMovie,
    renderCreateMovie,
    renderEditMovie
} from "../controllers/movieController.js";

import validateMovie from "../middleware/validateMovie.js";

const router = express.Router();

router.get("/api/movies", getMovies);
router.get("/api/movies/:id", getMovieById);

router.post("/api/movies", validateMovie, createMovie);
router.patch("/api/movies/:id", updateMovie);
router.delete("/api/movies/:id", deleteMovie);

router.get("/movies", renderMovies);
router.get("/movies/create", renderCreateMovie);
router.get("/movies/:id/edit", renderEditMovie);
router.get("/movies/:id", renderMovie);

export default router;