import express from 'express'
import authors from '../models/authorModel.js'
import books from '../models/bookModel.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(authors)
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const author = authors.find(author => author.id === id)
    if (!author) {
        return res.status(404)
        .json({
            message: `Author with id ${id} was not found`
        });
    }
    res.json(author)
})

router.get('/:id/books', (req, res) => {
    const id = Number(req.params.id)
    const author = authors.find(author => author.id === id)
   
    if (!author) {
        return res.status(404)
        .json({
            message: `Author with id ${id} was not found`
        });
    }
    
    const filteredBooks = books.filter(book => book.authorId === author.id)
    
    if (filteredBooks.length === 0) {
        res.json({message: `Author ${author.name} still didn't write any book`})
    }

    res.json(filteredBooks)
})


export default router