// Create endpoints for bookstores, make sure to use the middleware to authenticate the token
// Create endpoints for bookstores, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const AllBooksStores = await prisma.bookStore.findMany();
    if (AllBooksStores.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "there is no BookStores " });
    }

    res.json(AllBooksStores);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const bookStore = await prisma.bookStore.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!bookStore) {
      return res
        .status(404)
        .json({ status: 404, message: "That BookStore was not exist" });
    }

    res.json(bookStore);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.post("/create-bookStore", authenticate, async (req, res) => {
  try {
    const { name, location } = req.body;

    const newBookStore = await prisma.bookstore.create({
      data: {
        name,
        location,
      },
    });

    if (!newBookStore) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "BookStore was not created yet please try again.",
        });
    }

    res
      .status(200)
      .json({ status: 200, message: "BookStore was successFully created!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.put("/update-bookStore/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;

    const updateBookStore = await prisma.bookstore.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
        location,
      },
    });

    if (!updateBookStore) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "BookStore was not updated please try again..",
        });
    }

    res
      .status(200)
      .json({ status: 200, message: "BookStore was successFully updated!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.delete("/delete-bookStore/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteBookStore = await prisma.bookstore.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteBookStore) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "BookStore was not deleted or bookStore is not exist.",
        });
    }

    res
      .status(200)
      .json({
        status: 200,
        message: `BookStore ${id} was successFully deleted`,
      });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;