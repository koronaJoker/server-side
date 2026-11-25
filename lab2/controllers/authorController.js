export function getAuthorsController(req, res) {
    res.json(authors)
}

export function getAuthorByIdController(req, res) {
    const id = Number(req.params.id)

    const author = authors.find(author => author.id === id)
    if (!author) {
        return res.status(404)
        .json({
            message: `Author with id ${id} was not found`
        });
    }
    res.json(author)
}

export function getAuthorBooksByAuthorIdController(req, res) {
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
}