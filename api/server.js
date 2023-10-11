import express, {json}  from "express";
const server = express();
import authorsRouter from "./authors.js";
import bookstoreRouter from "./bookstores.js";
import booksRouter from "./books.js";
import ownerRouter from "./owner.js";

server.use(json());

server.use("/api/authors", authorsRouter);
server.use("/api/bookstores", bookstoreRouter);
server.use("/api/books", booksRouter);
server.use("/api/owner", ownerRouter);




export default server;