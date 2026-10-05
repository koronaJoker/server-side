import http from "http"
import {URL} from "url"
import {authors, books} from "./data.js"

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json")

    const url = new URL(req.url, `http://${req.headers.host}`)

    if (req.method === 'GET' && url.pathname === '/api/authors') {

        res.statusCode = 200
        res.end(JSON.stringify(authors))
    }

    else if (req.method === 'GET' && url.pathname.startsWith('/api/authors/')) {
        const parts = url.pathname.split('/')
        const id = Number(parts[3])
        
        const author = authors.find((author) => author.id === id)
        
        if (!author) {
            res.statusCode = 404
            res.end(JSON.stringify({error: `Author witn id ${id} was not found`}))
            return
        }
        res.statusCode = 200

        if (parts[4] === 'books') {
            const authorBooks = books.filter(book=> book.authorId === id)

            
            res.end(JSON.stringify(authorBooks))
            return
        }

        res.end(JSON.stringify(author))


    }    

    else if (req.method === 'GET' && url.pathname === '/api/books') {

        const genre = url.searchParams.get('genre')
        const authorId = Number(url.searchParams.get('authorId'))
        const year = Number(url.searchParams.get('year'))
        const rating = Number(url.searchParams.get('rating'))

        let filteredBooks = books

        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre === genre)
        }

        if (authorId) {
            filteredBooks = filteredBooks.filter(book => book.authorId === authorId)
        }

        if (year) {
            filteredBooks = filteredBooks.filter(book => book.year === year)
        }

        if (rating) {
            filteredBooks = filteredBooks.filter(book => book.rating === rating)
        }




        res.statusCode = 200
        res.setHeader("Content-Type", 'application/json')
        res.end(JSON.stringify(filteredBooks))
    }

    
    else if (req.method === 'GET' && url.pathname.startsWith('/api/books/')) {

        const parts = url.pathname.split('/')
        const id = Number(parts[3])
        
        const book = books.find((book) => book.id === id)
        
        if (book) {
            const author = authors.find(author => author.id == book.authorId)
            res.statusCode = 200
            const {title, year} = book
            res.end(JSON.stringify({
                id: id,
                title: title,
                year: year,
                author: author
            }))

        }
        else {
            res.statusCode = 404
            res.end(`Book witn id ${id} was not found`)
        }
    }

    else {
        res.statusCode = 404
        res.end("OPPPPPPPPPPPPPPS The page was not found")
    }
        
})

server.listen(3000, ()=> {
    console.log("Server is running at port 3000")
})