export function notFound(req, res) {
    res.status(404).render("404");
}

export function errorHandler(err, req, res, next) {
    console.error(err);

    res.status(err.status || 500).render("error");
}