import {body, validationResult } from "express-validator"
import { Teacher } from "../models/index.js"

export const validateCourse = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Название курса не может бфть пустым"),

    body("teacherId")
        .notEmpty()
        .withMessage("Преподователь обязателен"),

    body("credits")
        .notEmpty()
        .withMessage("Количество кредитов обязательно")
        .bail()
        .isInt({min: 1, max: 8 })
        .withMessage("Количество кредитов дожлно быть целым числом от 1 до 8")
        .toInt(),
    
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Описание курса не может быть пустым"),

    async (req, res, next) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        }

        try {
            const teachers = await Teacher.findAll({
                attributes: ["id", "name"],
                order: [["name", "ASC"]]
            })

            const isEdit = Boolean(req.params.id)

            return res.status(400).render(isEdit ? "courses/edit" : "courses/create", {
                errors: errors.array().map(error => error.msg),
                course: {...req.body, id: req.params.id},
                teachers
            })
        }

        catch (error) {
            next(error)
        }
    }

]



export const validateTeacher = [
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
            return res.status(400).render("teachers/create", {
                errors: errors.array().map(error => error.msg),
                teacher: req.body
            })
        }

        next()
    }
]


export const validateRegister = [
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
        .withMessage("Имя пользователя должно иметь длину от 2 до 50 символов")
        .normalizeEmail(), ///USER@GMAIL.COM -> user@gmail.com 
     
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Укажите пароль")
        .bail()
        .isLength({min: 8})
        .withMessage("Пароль минимум 8 символов"),

    body("confirmPassword")
        .trim()
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

export const validateLogin = [
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
