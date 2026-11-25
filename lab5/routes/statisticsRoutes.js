import express from "express"
import index from "../controllers/statisticsController.js"

import isAuthentificated from "../middleware/isAuthentificated.js"

const router =  express.Router()

router.get("/", isAuthentificated, index)

export default router