import books from "./models/bookModel.js"
import authors from "./models/authorModel.js"
import authorRoutes from './routes/authorRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import express from 'express'
import logger from "./middleware/logger.js"

const app = express()
const PORT = 3000

app.use(express.json())

app.use(logger)

app.use('/api/authors', authorRoutes)
app.use('/api/books', bookRoutes)
app.get('/api/statistics', (req, res) => {

    const genres = new Set(books.map(book => book.genre))

    const newestBook = books.reduce((newest, book) => {
        return book.year > newest?.year ? book : newest
    })

    const oldestBook = books.reduce((oldest, book) => {
        return book.year < oldest?.year ? book : oldest
    })

    res.json({
        booksCount: books.length,
        authorsCount: authors.length,
        genresCount: genres.size,
        newestBook,
        oldestBook
    })
})

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    })
})


app.listen(PORT, ()=> {
    console.log('Server started at port 3000')
})


//Невалидный -> 404
//     fetch("http://localhost:3000/api/books", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         title: "Post added book",
//         authorId: 3,

//     })
// })
// .then(async response => {
//     console.log("Status:", response.status);
//     console.log(await response.json());
// });

// Валидный
//     fetch("http://localhost:3000/api/books", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         title: "Post added book",
//         authorId: 3,
//         genre: "novel",
//         year: 2002
//     })
// })
// .then(async response => {
//     console.log("Status:", response.status);
//     console.log(await response.json());
// });

