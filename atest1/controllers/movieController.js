import movies from "../models/movieModel.js";

export function getMovies(req, res) {
    const { genre } = req.query;

    let result = movies;

    if (genre) {
        result = movies.filter(movie =>
            movie.genre.toLowerCase().includes(genre.toLowerCase())
        );
    }

    res.json(result);
}


export function getMovieById(req, res) {
    const id = Number(req.params.id);

    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).render("404");
    }

    res.json(movie);
}


export function createMovie(req, res) {
    const { title, genre, year, director } = req.body;

    const newMovie = {
        id: movies.length > 0
            ? Math.max(...movies.map(movie => movie.id)) + 1
            : 1,
        title: title.trim(),
        genre: genre.trim(),
        year: Number(year),
        director: director.trim()
    };

    movies.push(newMovie);

    res.status(201).json(newMovie);
}


export function updateMovie(req, res) {
    const id = Number(req.params.id);

    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).render("404");
    }

    const { title, genre, year, director } = req.body;

    if (title !== undefined) {
        movie.title = title.trim();
    }

    if (genre !== undefined) {
        movie.genre = genre.trim();
    }

    if (year !== undefined) {
        movie.year = Number(year);
    }

    if (director !== undefined) {
        movie.director = director.trim();
    }

    res.json(movie);
}


export function deleteMovie(req, res) {
    const id = Number(req.params.id);

    const index = movies.findIndex(movie => movie.id === id);

    if (index === -1) {
        return res.status(404).render("404");
    }

    const deletedMovie = movies.splice(index, 1)[0];

    res.json({
        message: "Фильм успешно удален",
        movie: deletedMovie
    });
}


export function renderMovies(req, res) {
    const { genre } = req.query;

    let filteredMovies = movies;

    if (genre) {
        filteredMovies = movies.filter(movie =>
            movie.genre.toLowerCase().includes(genre.toLowerCase())
        );
    }

    res.render("movies/index", {
        movies: filteredMovies,
        genre: genre || ""
    });
}


export function renderCreateMovie(req, res) {
    res.render("movies/create");
}


export function renderMovie(req, res) {
    const id = Number(req.params.id);

    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).render("404");
    }

    res.render("movies/show", { movie });
}


export function renderEditMovie(req, res) {
    const id = Number(req.params.id);

    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).render("404");
    }

    res.render("movies/edit", { movie });
}