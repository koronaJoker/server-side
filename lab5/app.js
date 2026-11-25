import express from "express"
import http from "http"
import { Server } from "socket.io"


import courseRoutes from "./routes/courseRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import statisticsRoutes from "./routes/statisticsRoutes.js"

import requestLogger from "./middleware/requestLogger.js"
//import logger from "./middleware/logger.js"

import { redirectToCourses } from "./controllers/homeController.js"
import errorHandler from "./middleware/errorHandler.js"
import notFound from "./middleware/notFound.js"
import connect from "./config/connect.js"
import sequelize from "./config/database.js"
import { sessionMiddleware } from "./config/session.js"
import "./models/index.js"

const app = express()

app.set("view engine", "ejs")
app.set("views", "./views")

//app.use(logger)
app.use(requestLogger)

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(sessionMiddleware)

app.use((req, res, next) => {
    res.locals.user = req.session.userId ? {
        id: req.session.userId,
        role: req.session.role
    } : null

    next()
})

app.get("/", redirectToCourses)

app.use("/courses", courseRoutes)
app.use("/teachers", teacherRoutes)
app.use("/statistics", statisticsRoutes)
app.use(authRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await connect()
        await sequelize.sync()

        const server = http.createServer(app)
        const io = new Server(server)

        app.set("io", io)

        io.on("connection", (socket) => {
            console.log("User connected:", socket.id)

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id)
            })
    })  

        server.listen(PORT, () => {
            console.log(`server start on port ${PORT}`)
        })
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`)
        process.exit(1)
    }
}

start()