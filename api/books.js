// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

//create a new book

router.get("/", authenticate, async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    if (books.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await prisma.books.findUnique({
      where: { id: Number(id) },
      if(books = null) {
        return res.status(404).json({ error: "Book not found" });
      },
    });
    res.json(books);
  } catch (error) {}
});
///post
router.post("/", authenticate, async (req, res) => {
  try {
    const { authorId,bookstoreId, title, image, price } = req.body;
    const book = await prisma.book.create({
      data: {
        authorId,
        bookstoreId,
        title,
        price,
        image,
      },
    });
    if (!book) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId,bookstoreId, title, image, price } = req.body;

    const book = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        authorId,
        bookstoreId,
        title,
        price,
        image,
      },
    });

    if (!book) {
      return res.status(404).json({ error: "not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: { id: Number(id) },
    });
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
