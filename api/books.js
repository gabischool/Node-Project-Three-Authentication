// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const book = await prisma.book.findMany();
    if (!book) {
      res.status(404).json({ message: "Not Found Books" });
    }
    res.json(book);
  } catch (err) {
    res
      .status(500)
      .json({ message: `internal server error`, error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!book) {
      res.status(404).json({ message: "Not Found book" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { authorId, title, bookstoreId, price, image } = req.body;
    const book = await prisma.book.create({
      data: {
        authorId,
        title,
        bookstoreId,
        price,
        image,
      },
    });
    if (!book) {
      res.status(404).json({ message: "Not Found book" });
    }
    res.json({ message: `book Created success`, book });
  } catch (err) {
    res
      .status(500)
      .json({ message: `internal server error`, error: err.message });
  }
});
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { title, price, image, bookstoreId } = req.body;
    const { id } = req.params;
    const book = await prisma.book.update({
      data: {
        authorId,
        title,
        price,
        image,
        bookstoreId,
      },
      where: {
        id: Number(id),
      },
    });
    if (!book) {
      res.status(404).json({ message: "Not Found book" });
    }
    res.json({ message: `book Updated success`, book });
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    if (!book) {
      res.status(404).json({ message: "Not Found book" });
    }
    res.json({ message: `book deleted success`, book });
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

export default router;
