import { Op } from "sequelize";
import { Course, Teacher } from "../models/index.js";


function isValidId(id) {
    return /^\d+$/.test(String(id)) && Number(id) > 0;
}

export async function index (req,res, next) {
    try {
        const {semester, search} = req.query

        const where = {}

        if (semester && semester != "all") {
            where.semester = semester
        }

        if (search) {
            where[Op.or] = [
                {title : {[Op.like] : `%${search}%`}},
                {description : {[Op.like] : `%${search}%`}}
            ]
        }

        const courses = await Course.findAll({where,  include: [{ model: Teacher, as: "Teacher" }]});
        res.render("courses/index", {courses})
    }

    catch (error) {
         next(error)
    }
}

export function create(req, res) {
    res.render("courses/create")
}

export async function store (req,res, next) {
    try {
        const {title, credits, semester, description, teacherId} = req.body

        await Course.create({
            title,
            credits,
            semester,
            description,
            teacherId
        })

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

        const course =  await Course.findByPk(id)

        if (!course) {
            return res.status(404).send("Course not found")
        }

        res.render("courses/details", {course})
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

        res.render("courses/edit", {course})
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

        res.redirect("/courses")
    }

    catch (error) {
        next(error)
    }
}

export async function destroy(req,res) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).send("Invalid ID")
        }

        const deletedCount = await Course.destroy({where: {id}})

        if (deletedCount === 0) {
            return res.status(404).send("Course not found")
        }

        res.redirect("/courses")
    }
    catch (error) {
        next(error)
    }
}