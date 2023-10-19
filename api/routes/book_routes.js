import express from 'express'
import { authenticate_author } from '../middleware/authenticate_author.js';
import { addbook, deletebooks, fetchbooks, updatebook } from '../controller/controller_books.js';
import { bookvalidation } from '../validations/books_validation.js';

export const bookroutes = express.Router();
bookroutes.post('/book/add', authenticate_author, bookvalidation, addbook)
bookroutes.put('/book/:id', authenticate_author, bookvalidation, updatebook)
bookroutes.get('/books', fetchbooks)
bookroutes.delete('/book/:id', deletebooks)