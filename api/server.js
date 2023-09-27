import express from "express";
import {json} from 'express'
import ownerRout from './owner.js'
import bookstoreRoute from './bookstores.js'
import AuthorRoute from './authors.js'
import Book  from './books.js'
const server = express()
server.use(json())


server.use('/api/owner', ownerRout)
server.use('/api/bookstore', bookstoreRoute)
server.use('/api/author', AuthorRoute)
server.use('/api/book', Book)

export default server