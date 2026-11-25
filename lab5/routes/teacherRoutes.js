import {Router} from "express"
import * as controller from "../controllers/teacherController.js"
import  validateTeacher from "../middleware/validators/validateTeacher.js"

import isAdmin from "../middleware/isAdmin.js"
import isAuthentificated from "../middleware/isAuthentificated.js"

const router = Router()

router.get("/", controller.index)
router.get("/new", isAuthentificated, isAdmin, controller.create) // new перед id
router.post("/", isAuthentificated, isAdmin, validateTeacher, controller.store)

router.get("/:id", controller.show)
router.get("/:id/edit", isAuthentificated, isAdmin ,controller.edit)
router.post("/:id/edit", isAuthentificated, isAdmin,validateTeacher, controller.update)
router.post("/:id/delete", isAuthentificated, isAdmin, controller.destroy)

export default router