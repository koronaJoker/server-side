import courses from "../models/courseModel.js"

export function RedirectToCoursesPageController (req, res) {
    res.redirect("/courses")
}

export function showPageNotFoundController (req, res) {
    return res.status(404).render("404")
}

export function showErrorOnServerPageController (err, req, res,next) {
    console.log(err.stack)

    res.status(500).render("error")
}

export function showFilteredCoursesPageController(req, res) {
    const semester = req.query.semester || 'all'
    const search = req.query.search

    let filteredCourses = courses

    if (semester !== 'all')
        filteredCourses = filteredCourses.filter(course => course.semester === Number(semester))

    if (search) {
        if (search) {
    filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
    )
}
    }

    res.render("courses", {
        courses: filteredCourses
    })
}

export function showCreateCoursePageController (req, res) {
    res.render("courses/create", {errors: [], course:{}})
}

export function showEditCoursePageByIdController (req,res) {
    const id = Number(req.params.id)
      if (!courses.find(course => course.id === id)) {
        return res.status(404).render("404")
    }
    res.render("courses/edit", {course: courses[id-1], errors: []})
}

export function showCourseDetailsByIdController (req,res) {
    const id = Number(req.params.id)

    if (!courses.find(course => course.id === id)) {
        return res.status(404).render("404")
    }

    res.render("courses/details", {
        course: courses[id-1]
    })
}

export function addCourseController (req, res) {
    const {title, teacher, credits, semester, description} = req.body

    const newCourse = {
        id: Math.max(...courses.map(course => course.id)) + 1,
        title,
        teacher,
        credits,
        semester,
        description
    }


    courses.push(newCourse)

    res.redirect("/courses");
}

export function editCourseController (req, res) {
    const id = Number(req.params.id)

    const index = courses.findIndex(course => course.id === id)

    if (index === -1) {
        return res.status(404).render("404")
    }

    const {title, teacher, credits, semester, description} = req.body

    const newCourse = {
        id,
        title,
        teacher,
        credits,
        semester,
        description
    }


    courses[index] = newCourse

    res.redirect(`/courses/${id}`);
}

export function deletePostControllerById(req,res) {
    const id = Number(req.params.id)

    const index = courses.findIndex(course => course.id === id)

    if (index === -1) {
        return res.status(404).render("404")
    }

    courses.splice(index, 1)
    
    res.status(200).json({
        message: "Курс был успешно удален"
    })
}