import express from 'express';
import { delete_author, get_author, get_authors, login_author, register_author, update_author } from '../controller/controller_authors.js';
import { authenticate_author } from '../middleware/authenticate_author.js';
import { authorvalidation } from '../validations/authors_validation.js';
export const author_routes = express.Router();
author_routes.post('/author/register', authorvalidation, register_author)
author_routes.post('/author/login', login_author)
author_routes.get('/author', get_authors)
author_routes.get('/current/author', authenticate_author, get_author)
author_routes.delete('/author/:id', delete_author)
author_routes.put('/author/:id', update_author)