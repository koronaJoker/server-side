import {body, validationResult } from "express-validator"
import { Teacher } from "../../models/index.js"

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


export default validateCourse






