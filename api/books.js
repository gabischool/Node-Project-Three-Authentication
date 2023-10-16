// Create endpoints for books, make sure to use the middleware to authenticate the token
// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    if (books.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "there is no books " });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
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
      return res
        .status(404)
        .json({ status: 404, message: "That Book was not exist" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.post("/create-book", authenticate, async (req, res) => {
  try {
    const { authorId, bookstoreId, title, price, image } = req.body;

    const newBook = await prisma.book.create({
      data: {
        authorId,
        bookstoreId,
        title,
        price,
        image,
      },
    });

    if (!newBook) {
      return res
        .status(400)
        .json({
          status: 400,
          messsage: "Book was not created yet please try again.",
        });
    }

    res
      .status(200)
      .json({ status: 200, message: "Book was successFully created!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.put("/update-book/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, bookstoreId, title, price, image } = req.body;

    const updateBook = await prisma.book.update({
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

    if (!updateBook) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Book was not updated please try again..",
        });
    }

    res
      .status(200)
      .json({ status: 200, message: "Book was successFully updated!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.delete("/delete-book/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteBook = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteBook) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Book was not deleted or book is not exist.",
        });
    }

    res
      .status(200)
      .json({ status: 200, message: `Book ${id} was successFully deleted` });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;