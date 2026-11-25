import express from "express"
import courseRoutes from "./routes/courseRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"
import statisticsRoutes from './routes/statisticsRoutes.js'
import logger from "./middleware/logger.js"

import { redirectToCourses } from "./controllers/homeController.js";
import  errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js"
import connect from "./config/connect.js";
import sequelize from "./config/database.js";
import "./models/index.js";


const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(logger)


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', redirectToCourses)

app.use('/courses', courseRoutes)
app.use('/teachers', teacherRoutes)
app.use('/statistics', statisticsRoutes)

app.use(notFound);
app.use(errorHandler);

async function start() {
    try {
        await connect()
        
        await sequelize.sync();

        app.listen("3000", ()=> {
            console.log("server start")
        })
    }

    catch (error) {
        console.error(`Failed to start server: ${error.message}`)
        process.exit(1)
    }
}

start()