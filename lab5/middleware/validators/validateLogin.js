import {body, validationResult } from "express-validator"

const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email обязателен")
        .bail()
        .isEmail()
        .withMessage("Некорректный email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Введите пароль"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("auth/login", {
                errors: errors.array().map(error => error.msg),
                email: req.body.email
            });
        }

        next();
    }
];

export default validateLogin