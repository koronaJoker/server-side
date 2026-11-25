export default function validateCourse(req,res,next) {
    const {title, teacher, description} = req.body

    const credits = Number(req.body.credits)
    const semester = Number(req.body.semester)

    const errors = []

    if (!title?.trim()) {
        errors.push("Название курса обязательно")
    }
    if(!teacher?.trim()) {
        errors.push("Преподаватель обязателен")
    }
    if (isNaN(credits)) {
        errors.push("количество кредитов должно быть числом")
    }
    else if (credits <= 0) {
        errors.push("Количество кредитов должно быть больше нуля")
    }

    if (!Number.isInteger(semester)) {
        errors.push("Семестр должен быть целым числом")
    }

    else if (semester < 1 || semester > 8) {
        errors.push("Семестр должен быть от 1 до 8")
    }
    if (!description?.trim()) {
        errors.push("Описание обязательно")
    }

    if (errors.length > 0) {
        return res.status(400).render("courses/create", {
            errors,
            course: req.body
        })
    }

    req.body.semester = semester
    req.body.credits = credits

    next()
}