// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

//create book route
router.get("/",authenticate, async(req, res) => {
    try {
        const books = await prisma.book.findMany();

        if (books) {
            res.status(200).json(books);
          } else {
            res.status(404).json({ message: "books not found" });
          }

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//Get Single book
router.get("/:id",authenticate, async(req, res) => {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id:Number(req.params.id)
            },
        });

        if(book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message : "book not found"})
        }

    } catch (error) {
        res.status(500).json({message : "failed to get book"})
    }
});

//Add book
router.post("/",authenticate, async(req, res) => {
    try {
        const book = await prisma.book.create({
            data: req.body,
        });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({message: "failed to add book"})
    }
});

//update book
router.put("/:id",authenticate, async(req, res) => {
    try {
        const book = await prisma.book.update({
            where : {
                id:Number(req.params.id),
            },
            data : req.body,
        });

        if(book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message:"book not found"})
        }
    } catch (error) {
        res.status(500).json({message : "failed to update book"})
    }
});

//Delete book
router.delete("/:id",authenticate, async(req, res) => {
    try {
        const book = await prisma.book.delete({
            where: {
                id:Number(req.params.id),
            },
        });

        if(book) {
            res.status(200).json({message: "book deleted"})
        } else {
            res.status(404).json({message: "book not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to delete book"})
    }
});



export default router;