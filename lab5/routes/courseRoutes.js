import express from "express"
import validateCourse from "../middleware/validators/validateCourse.js"
import * as controller from "../controllers/courseController.js"
import isAdmin from "../middleware/isAdmin.js"
import isAuthentificated from "../middleware/isAuthentificated.js"

const router = express.Router()


router.get("/", controller.index)

router.get("/new", isAuthentificated, isAdmin, controller.create)

router.get("/:id", controller.show)

router.get("/:id/edit", isAuthentificated, isAdmin, controller.edit)

router.post("/",isAuthentificated, isAdmin, validateCourse, controller.store)

router.post("/:id/edit", isAuthentificated, isAdmin, validateCourse, controller.update)

router.post('/:id/delete',isAuthentificated, isAdmin, controller.destroy)



export default router
