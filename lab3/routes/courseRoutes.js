import express from "express"
import courses from "../models/courseModel.js"
import validateCourse from "../middleware/validateCourse.js"
import {
    showFilteredCoursesPageController,
    showCreateCoursePageController,
    showEditCoursePageByIdController,
    showCourseDetailsByIdController,
    addCourseController,
    editCourseController, 
    deletePostControllerById
} from "../controllers/courseController.js"

const router = express.Router()


router.get("/", showFilteredCoursesPageController)


router.get("/new", showCreateCoursePageController)


router.get("/:id/edit", showEditCoursePageByIdController)


router.get("/:id", showCourseDetailsByIdController)


router.post("/new", validateCourse, addCourseController)

router.post("/:id/edit", validateCourse, editCourseController)

router.delete('/:id', deletePostControllerById)



export default router
