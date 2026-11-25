import express from "express"
import {showRegister, showLogin} from "../controllers/authController.js"
import validateRegister from "../middleware/validators/validateRegister.js"
import validateLogin from "../middleware/validators/validateLogin.js"

const router = express.Router()

router.get("/register", showRegister)

router.get("/login", showLogin)

export default router