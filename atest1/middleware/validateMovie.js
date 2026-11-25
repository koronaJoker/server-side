export default function validateMovie(req, res, next) {
    const { title, genre, year, director } = req.body;

    const errors = [];

    if (!title?.trim()) {
        errors.push("Название фильма обязательно");
    }

    if (!genre?.trim()) {
        errors.push("Жанр обязателен");
    }

    if (!director?.trim()) {
        errors.push("Режиссер обязателен");
    }

    if (!year || Number.isNaN(Number(year))) {
        errors.push("Год должен быть числом");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors
        });
    }

    next();
}