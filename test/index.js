const express = require("express")
const sequelize = require("./config/database")
const Task = require("./models/Task")

const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    try {
        const tasks = await Task.findAll({
                order: [["id", "ASC"]]
            })

        res.render("index", {tasks})
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Database error!")
    }
})


app.get("/tasks/edit/:id", async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if (!task) {
            return res.status(404).send("Task not found")
        }

        res.render("edit", {task})
    }
    catch (error) {
        console.error(error)
        res.status(500).send("error loading task!")
    }
})


app.post("/tasks", async (req, res) => {
    try {
        const {name} = req.body

        if  (typeof name !== "string" || !name.trim().length > 50) {
            return res.status(400).send("Invalid task name!")
        }

        await Task.create({
            name: name.trim(),
            completed: false
        })

        res.redirect("/")
    }


    catch (error) {
        console.error(error)
        res.status(500).send("error adding task!")
    }
})


app.post("/tasks/edit/:id", async (req, res) => {
    try {
        const {name, completed} = req.body

        if (typeof name !== "string" || !name.trim() || name.trim().length > 50) {
            return res.status(400).send("Invalid task name!")
        }

        const task = await Task.findByPk(req.params.id)

        if (!task) {
            res.status(404).send("Task not found")
        }

        await task.update({
            name: name.trim(),
            completed: completed === "true"
        })

        res.redirect("/")
    }

    catch (error) {
        console.log(error)
        res.status(500).send("Error updating task")
    }

    
})

app.post("/tasks/delete/:id", async (req, res) => {
    
    try{
        const {id} = req.params

        const deleted = await Task.destroy({
            where: {
                id: id
            }
        })

        if (deleted === 0) {
            return res.status(404).send("Task not found")
        }

        res.redirect("/")
    }
    catch (error) {
        console.error(error)
        res.status(404).send("Error deleting task")
    }
})

async function start() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Connected!")

        app.listen(process.env.PORT, () => {
            console.log("Server Started!")
        })
    }
    catch(error) {
        console.log("Database connection failed: ", error)
        process.exit(1)
    }
}

start()