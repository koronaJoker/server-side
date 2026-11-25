import express from "express"
import router from "./routes/courseRoutes.js"
import logger from "./middleware/logger.js"

import {RedirectToCoursesPageController, showPageNotFoundController, showErrorOnServerPageController} from "./controllers/courseController.js";

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(logger)

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', RedirectToCoursesPageController)

app.use('/courses', router)

app.use(showPageNotFoundController)

app.use(showErrorOnServerPageController)

app.listen("3000", ()=> {
    console.log("server start")
})