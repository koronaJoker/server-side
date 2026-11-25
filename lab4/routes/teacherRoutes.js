import {Router} from "express"
import * as controller from "../controllers/teacherController.js"
import { validateTeacher } from "../middleware/validation.js"

const router = Router()

router.get("/", controller.index)
router.get("/new", controller.create) // new перед id
router.post("/", validateTeacher ,controller.store)

router.get("/:id", controller.show)
router.get("/:id/edit", controller.edit)
router.post("/:id/edit", validateTeacher, controller.update)
router.post("/:id/delete", controller.destroy)

export default router