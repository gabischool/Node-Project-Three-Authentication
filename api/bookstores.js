// Create endpoints for bookstores, make sure to use the middleware to authenticate the token

import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const store = await prisma.bookStore.findMany();
    if (!store) {
      res.status(404).json({ message: "Not Found Books" });
    }
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const store = await prisma.bookStorestore.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!store) {
      res.status(404).json({ message: "Not Found store" });
    }
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { name, location } = req.body;
    const store = await prisma.bookStore.create({
      data: {
        name,
        location,
      },
    });
    if (!store) {
      res.status(404).json({ message: "Not Found store" });
    }
    res.json({ message: `store Created success`, store });
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { name, location } = req.body;
    const { id } = req.params;
    const store = await prisma.bookStore.update({
      data: {
        name,
        location,
      },
      where: {
        id: Number(id),
      },
    });
    if (!store) {
      res.status(404).json({ message: "Not Found store" });
    }
    res.json({ message: `store Updated success`, store });
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const store = await prisma.bookStore.delete({
      where: {
        id: Number(id),
      },
    });
    if (!store) {
      res.status(404).json({ message: "Not Found store" });
    }
    res.json({ message: `Author deleted success`, store });
  } catch (err) {
    res.status(500).json({ message: `internal server error`, err });
  }
});

export default router;
