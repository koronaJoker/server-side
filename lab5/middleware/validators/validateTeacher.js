import {body, validationResult } from "express-validator"

const validateTeacher = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Имя преподавателя обязательно")
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage("Имя должно содержать от 2 до 50 сивмолов"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email обязателен")
        .bail()
        .isEmail()
        .withMessage("Некорректный формат почты")
        .normalizeEmail(),

    body("department")
        .trim()
        .notEmpty()
        .withMessage("Укажите департамент")
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage("Название департамента должно содержать от 2 до 50 символов"),
    
    body("academicDegree")
        .trim()
        .notEmpty()
        .withMessage("Научная степень обязательна")
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage("Научиная степень - это строка, длиной от 2 до 50 символов"),
    
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg)

        if (req.params.id) {
            return res.status(400).render("teachers/edit", {
                errors: messages,
                teacher: { ...req.body, id: req.params.id }
            })
        }

        return res.status(400).render("teachers/create", {
            errors: messages,
            teacher: req.body
        })
    }

        next()
    }
]

export default validateTeacher