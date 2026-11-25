import books from "../models/bookModel.js"

export function getFilteredBooksController (req, res)  {
    const genre = req.query.genre
    const year = Number(req.query.year)
    

    let filteredBooks = books

    if (genre) 
        filteredBooks = filteredBooks.filter(book => book.genre === genre)

    if (year)
        filteredBooks = filteredBooks.filter(book => book.year === year)



    res.json(filteredBooks)
}

export function searchBookController(req, res) {
    const title = req.query.title
    if (!title) {
        return res.status(400).json({
            error: "Title is missing"
        })
    }

    const searchTitle = title.toLowerCase()

    const result = books.filter(book => book.title.toLowerCase().includes(searchTitle))

    res.json(result)
}

export function getBookByIdController (req, res) {
    const id = Number(req.params.id)

    const book = books.find(book => book.id === id)
    if (!book) {
        return res.status(404)
        .json({
            message: "Book not found"
        });
    }
    res.json(book)
}
export function addBookController (req, res) {
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
}

export function deleteBookController (req, res) {
    const bookId = Number(req.params.id)

    const index = books.findIndex(book => book.id === bookId)

    if (index === -1) {
        return res.status(404).json({
            message: `Book with id ${bookId} doesn't exist`
        })
    }

    const deletedBook = books.splice(index, 1)[0]

    res.json(deletedBook)
}

export function patchBookController (req, res) {
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

}