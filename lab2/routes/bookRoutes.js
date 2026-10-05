import express from 'express'
import books from '../models/bookModel.js'
import authors from "../models/authorModel.js"


const router = express.Router()

router.get('/', (req, res) => {
    const genre = req.query.genre
    const year = Number(req.query.year)
    

    let filteredBooks = books

    if (genre) 
        filteredBooks = filteredBooks.filter(book => book.genre === genre)

    if (year)
        filteredBooks = filteredBooks.filter(book => book.year === year)



    res.json(filteredBooks)
})

router.get("/search", (req, res) => {
    const title = req.query.title
    if (!title) {
        return res.status(400).json({
            error: "Title is missing"
        })
    }

    const searchTitle = title.toLowerCase()

    const result = books.filter(book => book.title.toLowerCase().includes(searchTitle))

    res.json(result)
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const book = books.find(book => book.id === id)
    if (!book) {
        return res.status(404)
        .json({
            message: "Book not found"
        });
    }
    res.json(book)
})


router.post('/', (req, res) => {
    const { title, authorId, genre, year } = req.body

    if (
    title === undefined ||
    authorId === undefined ||
    genre === undefined ||
    year === undefined
) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
    const author = authors.find(author => author.id === authorId)
    
    if (!author) {
        return res.status(400).json({
            error: `Author with id ${authorId} was not found`
        })
    }

    const newId = books.length === 0 ? 1 : Math.max(...books.map(book => book.id)) + 1

    const book = {
        id: newId,
        title,
        authorId,
        genre,
        year
    }

    books.push(book)

    res.status(201).json(book)
})

router.delete("/:id", (req, res) => {
    const bookId = Number(req.params.id)

    const index = books.findIndex(book => book.id === bookId)

    if (index === -1) {
        return res.status(404).json({
            message: `Book with id ${bookId} doesn't exist`
        })
    }

    const deletedBook = books.splice(index, 1)[0]

    res.json(deletedBook)
})


// fetch("http://localhost:3000/api/books/3", {
//     method: "DELETE"
// })
// .then(async response => {
//     console.log("Status:", response.status);
//     console.log(await response.json());
// });


router.patch("/:id", (req, res) => {
    const bookId = Number(req.params.id)

    const book = books.find(book => book.id === bookId)

    if (!book) {
        return res.status(404).json({
            message: `Book with id ${404} was not found`
        })
    }

    const {title, authorId, genre, year } = req.body

    if (title !== undefined) {
        book.title = title
    }

    if (authorId !== undefined) {
        book.authorId = authorId
    }

    if (genre !== undefined) {
        book.genre = genre
    }

    if (year !== undefined) {
        book.year = year
    }

    res.json(book)

})

// fetch("http://localhost:3000/api/books/1", {
//     method: "PATCH",

//     headers: {
//         "Content-Type": "application/json"
//     },

//     body: JSON.stringify({
//         year: 2020
//     })
// })
// .then(async response => {
//     console.log("Status:", response.status)
//     console.log(await response.json())
// })

export default router