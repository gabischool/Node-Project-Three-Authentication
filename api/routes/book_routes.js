import express from 'express'
import { authenticate_author } from '../middleware/authenticate_author.js';
import { addbook, deletebooks, fetchbooks, updatebook } from '../controller/controller_books.js';

export const bookroutes = express.Router();
bookroutes.post('/book/add', authenticate_author, addbook)
bookroutes.put('/book/:id', authenticate_author, updatebook)
bookroutes.get('/books', fetchbooks)
bookroutes.delete('/book/:id', deletebooks)