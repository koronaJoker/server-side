import {body, validationResult } from "express-validator"

const validateRegister = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Имя пользователя - обязательно")
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage("Имя пользователя должно иметь длину от 2 до 50 символов"),
    
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Почта - обязательна")
        .bail()
        .isEmail() 
        .withMessage("неверный формат почты")
        .normalizeEmail(), ///USER@GMAIL.COM -> user@gmail.com 
     
    body("password")
        .notEmpty()
        .withMessage("Укажите пароль")
        .bail()
        .isLength({min: 8})
        .withMessage("Пароль минимум 8 символов"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Подтвердите пароль")
        .bail()
        .custom((value , {req}) => {
            if (value !== req.body.password) {
                throw new Error("Пароли не совпадают!")
            }

            return true
        }),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).render("auth/register", {
                errors: errors.array().map(error => error.msg),
                user: {
                    username: req.body.username,
                    email: req.body.email
                }
            })
        }
        next()
    }
]

export default validateRegister