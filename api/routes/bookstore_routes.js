import express from 'express'
import { authenticate_owner } from '../middleware/authenticate_owner.js';
import { addbookstore, deletebookstore, fetchbookstore, fetchbookstores, updatebookstore } from '../controller/controller_bookstores.js';

export const bookstore_routes = express.Router();
bookstore_routes.post('/bookstore/add', authenticate_owner, addbookstore);
bookstore_routes.put('/bookstore/:id', authenticate_owner, updatebookstore);
bookstore_routes.get('/bookstore', fetchbookstores);
bookstore_routes.get('/ownerCurrent/bookstore', authenticate_owner, fetchbookstore);
bookstore_routes.delete('/bookstore/:id', deletebookstore);