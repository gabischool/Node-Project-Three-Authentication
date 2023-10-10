import express from "express";
import ownerRouter from "./owner.js";
import authorsRouter from "./authors.js";
import booksRouter from "./books.js";
import bookStoreRouter from "./bookstores.js";

const server = express();

server.use(express.json());

server.use("/api/owners", ownerRouter)
server.use("/api/authors", authorsRouter);
server.use("/api/books", booksRouter);
server.use("/api/bookstores", bookStoreRouter);
 

export default server;
