// Create endpoints for authors, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const AllAuthors = await prisma.author.findMany();
    if (AllAuthors.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "That Author does not exist" });
    }

    res.json(AllAuthors);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const author = await prisma.author.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!author) {
      return res
        .status(404)
        .json({ status: 404, message: "That Author does not exist" });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.post("/create-author", authenticate, async (req, res) => {
  try {
    const { name } = req.body;

    const newAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    if (!newAuthor) {
      return res.status(400).json({
        status: 400,
        message: "Author was not created yet please try again.",
      });
    }

    res
      .status(200)
      .json({ status: 200, message: "Author was successFully created! " });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.put("/update-author/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateAuthor = await prisma.author.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
      },
    });

    if (!updateAuthor) {
      return res.status(400).json({
        status: 400,
        message: "Author was not updated please try again..",
      });
    }

    res
      .status(200)
      .json({ status: 200, message: "Author was successFully updated!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.delete("/delete-author/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteAuthor = await prisma.author.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteAuthor) {
      return res.status(400).json({
        status: 400,
        message: "Author was not deleted or author is not exist.",
      });
    }

    res.status(200).json({
      status: 200,
      message: `Author ${id}  was successFully deleted`,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;
