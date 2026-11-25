import express from 'express'
import books from '../models/bookModel.js'
import authors from "../models/authorModel.js"

import {getFilteredBooksController, patchBookController,searchBookController, getBookByIdController, addBookController, deleteBookController} from "../controllers/bookController.js"

const router = express.Router()

router.get('/', getFilteredBooksController)

router.get("/search", searchBookController)

router.get('/:id', getBookByIdController)


router.post('/', addBookController)

router.delete("/:id", deleteBookController)


// fetch("http://localhost:3000/api/books/3", {
//     method: "DELETE"
// })
// .then(async response => {
//     console.log("Status:", response.status);
//     console.log(await response.json());
// });


router.patch("/:id", patchBookController)

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