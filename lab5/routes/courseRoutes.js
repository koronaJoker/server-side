import express from "express"
import validateCourse from "../middleware/validators/validateCourse.js"
import * as controller from "../controllers/courseController.js"

const router = express.Router()


router.get("/", controller.index)

router.get("/new", controller.create)

router.get("/:id", controller.show)

router.get("/:id/edit", controller.edit)

router.post("/", validateCourse, controller.store)

router.post("/:id/edit", validateCourse, controller.update)

router.post('/:id/delete', controller.destroy)



export default router
