import express from 'express'
import {json} from 'express'
import owner from './owner.js'
import BookStore from './bookstores.js'
import author from './authors.js'
import Books from './books.js'
const server = express()
server.use(json())


server.use('/api/owner', owner)
server.use("/api/BookStore", BookStore)
server.use('/api/auther', author)
server.use('/api/books', Books)


export default server