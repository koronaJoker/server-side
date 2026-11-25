import express from "express";
import movieRouter from "./routes/movieRoutes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

app.use(movieRouter);


app.use((req, res) => {
    res.status(404).render("404");
});


app.listen(3000, () => {
    console.log("Server started: http://localhost:3000");
});