import {Teacher, Course} from "../models/index.js"

function isValidId(id) {
    return /^\d+$/.test(String(id)) && Number(id) > 0;
}

export async function index(req,res,next) {
    try {
        const teachers = await Teacher.findAll(
            {
                include: [{
                    model: Course,
                    attributes: ["id"]
                }]
            }
        )
        res.render("teachers/index", {teachers})
    }

    catch (error) {
        next(error)
    }
}

export async function create(req,res) {
    res.render("teachers/create")
}

export async function store(req, res, next) {
    try {
        const {name,email,department,academicDegree} = req.body

        await Teacher.create({name,email,department,academicDegree})

        res.redirect("/teachers")
    }

    catch (error) {
        next(error)
    }
}

export async function show(req,res,next) {
    try {
        const teacher = await Teacher.findByPk(req.params.id, {
            include: Course
        })

        if (!teacher) {
            return res.status(404).render("404")
        }

        res.render("teachers/details", {teacher})
    }

    catch(error) {
        next(error)
    }

}

export async function edit(req,res,next) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            res.status(404).send("Invalid teacher Id")
        }

        const teacher = await Teacher.findByPk(id)
        if (!teacher) {
            res.status(404).send("Teacher not found")
        }

        res.render("teachers/edit", {teacher})
    }
    catch(error) {
        next(error)
    }

}
 
export async function update(req,res,next) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(404).send("Teacher not found")
        }

        const teacher = await Teacher.findByPk(id)

        if (!teacher) {
            return res.status(404).send("Teacher not found")
        }

        const {name, email, department, academicDegree} = req.body

        await teacher.update({name, email, department, academicDegree})

        res.reditect("/teachers")
    }

    catch (error) {
        next(error)
    }
}

export async function destroy(req,res) {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(404).send("Invalid ID")
        }

        const deletedCount = await Teacher.destroy({where: {id}})

        if (deletedCount === 0) {
            return res.status(404).send("teacher not found")
        }

        res.redirect("/teachers")
    }
    catch (error) {
        next(error)
    }
}