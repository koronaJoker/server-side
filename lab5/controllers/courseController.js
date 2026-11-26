import { Op } from "sequelize";
import { Course, Teacher } from "../models/index.js";
import { logAdminAction } from "../utils/adminLogger.js";

function isValidId(id) {
    return /^\d+$/.test(String(id)) && Number(id) > 0;
}

export async function index (req,res, next) {
    try {
        const {semester, search, teacherId} = req.query

        const where = {}

        if (semester && semester !== "all") {
            where.semester = semester
        }

        if (teacherId && teacherId !== "all" && isValidId(teacherId)) {
            where.teacherId = Number(teacherId)
        }

        if (search) {
            where[Op.or] = [
                {title : {[Op.like] : `%${search}%`}},
                {description : {[Op.like] : `%${search}%`}}
            ]
        }

        const courses = await Course.findAll({where,  include: [{ model: Teacher, as: "Teacher" }]});

         const teachers = await Teacher.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]]
        })

        const notification = req.session.courseNotification || null
        delete req.session.courseNotification

        res.render("courses/index", {courses, teachers, search, semester, teacherId, notification})
    }

    catch (error) {
         next(error)
    }
}

export async function create(req, res, next) {
    try {
        const teachers = await Teacher.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]]
        })

        res.render("courses/create", {
        errors: [],
        course: {},
        teachers,
        teacherId: 'all'
        })
    }


    catch (error) {
        next(error)
    }

}

export async function store (req,res, next) {
    try {
        const {title, credits, semester, description, teacherId} = req.body

        const teacher = await Teacher.findByPk(teacherId)

        if (!teacher) {
            return res.status(400).render("courses/create", {
                errors: ["Преподаватель не найден"],
                course: req.body,
                teachers: await Teacher.findAll({
                    attributes: ["id", "name"],
                    order: [["name", "ASC"]],
                teacherId: 'all'
                })
            })
        }

        const course = await Course.create({
            title,
            credits,
            semester,
            description,
            teacherId
        })

        const notification = {
            courseName: course.title,
            teacherName: teacher.name,
            createdAt: new Date().toLocaleString("ru-RU")
        }

        req.session.courseNotification = notification
        req.app.get("io")?.emit("courseCreated", notification)

        logAdminAction(req.session.email, "ADD COURSE", "Course", course.id);
        res.redirect("/courses")
    }
    catch (error) {
        next(error)
    }
}

export async function show (req,res,next) {
    try {
        const {id} = req.params
        if (!isValidId(id)) {
            return res.status(404).send("Invalid course ID")
        }

        const course = await Course.findByPk(id, {
            include: [{
                model: Teacher,
                as: "Teacher",
                attributes: ["id", "name"]
            }]
        })

        if (!course) {
            return res.status(404).send("Course not found")
        }

        const teachers = await Teacher.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]]
        })

        res.render("courses/details", {course, teacherId: "all", teachers})
    }

    catch (error) {
        next(error)
    }
}

export async function edit (req,res, next) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(404).send("Invalid course ID")
        }

        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).send("Course not found")
        }

        const teachers = await Teacher.findAll(
            {
                attributes: ["id", "name"],
                order: [["name", "ASC"]],

            }
        );

        res.render("courses/edit", {course, errors: [], teachers, teacherId: "all"})
    }

    catch (error) {
        next(error)
    }
}

export async function update(req,res,next) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(404).send("Course not found")
        }

        const course = await Course.findByPk(id)

        if (!course) {
            return res.status(404).send("Course not found")
        }

        const {title, credits, semester, description, teacherId} = req.body

        await course.update({title, credits, semester, description, teacherId})
        logAdminAction(req.session.email, "EDIT COURSE", "Course", course.id);
        res.redirect("/courses")
    }

    catch (error) {
        next(error)
    }
}

export async function destroy(req,res,next ) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).send("Invalid ID")
        }

        const deletedCount = await Course.destroy({where: {id}})

        if (deletedCount === 0) {
            return res.status(404).send("Course not found")
        }

        logAdminAction(req.session.email, "DELETE COURSE", "Course", id);
        res.redirect("/courses")
    }
    catch (error) {
        next(error)
    }
}
