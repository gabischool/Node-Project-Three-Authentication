// Create endpoints for bookstores, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

//getting the author

router.get("/", authenticate, async (req, res) => {
  try {
    const bookStore = await prisma.bookStore.findMany();
    if (bookStore.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(bookStore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//getting the bookstore by id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const bookStore = await prisma.bookStore.findUnique({
      where: { id: Number(id) },
      if(bookStore = null) {
        return res.status(404).json({ error: "Book not found" });
      },
    });
    res.json(bookStore);
  } catch (error) {}
});
/// creating new book store
router.post("/", authenticate, async (req, res) => {
  try {
    const { ownerId, name, location } = req.body;
    const bookStore = await prisma.bookStore.create({
      data: {
        ownerId,
        name,
        location,
      },
    });
    if (!bookStore) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json(bookStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//edit the author
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;

    const bookStore = await prisma.bookStore.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        location,
      },
    });
    if (!bookStore) {
      return res.status(404).json({ error: "not found" });
    }
    res.json(bookStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

///delete the book store
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const bookStore = await prisma.book.delete({
      where: { id: Number(id) },
    });
    if (!bookStore) {
      return res.status(404).json({ error: "book not found" });
    }
    res.json(bookStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
