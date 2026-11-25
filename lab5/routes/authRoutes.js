import express from "express"
import * as controller from "../controllers/authController.js"
import validateRegister from "../middleware/validators/validateRegister.js"
import validateLogin from "../middleware/validators/validateLogin.js"


import isAuthentificated from "../middleware/isAuthentificated.js"

const router = express.Router()

router.get("/register", controller.showRegister)

router.post("/register", validateRegister, controller.register)

router.get("/login", controller.showLogin)

router.post("/login", validateLogin, controller.login)

router.post("/logout", controller.logout) 

router.get("/profile", isAuthentificated, controller.showProfile)

export default router