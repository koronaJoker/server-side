import express from 'express'
import authors from '../models/authorModel.js'
import books from '../models/bookModel.js'

import { getAuthorsController, getAuthorByIdController, getAuthorBooksByAuthorIdController } from '../controllers/authorController.js'

const router = express.Router()

router.get('/', getAuthorsController)

router.get('/:id', getAuthorByIdController)

router.get('/:id/books', getAuthorBooksByAuthorIdController)


export default router