import express from "express";
import AuthorRouter from "./authors.js";
import BookRouter from "./books.js";
import storeRouter from "./bookstores.js";
import ownerRouter from "./owner.js";
const server = express();

server.use(express.json());

server.use("/api/author", AuthorRouter);
server.use("/api/books", BookRouter);
server.use("/api/store", storeRouter);
server.use("/api/owner", ownerRouter);

export default server;
