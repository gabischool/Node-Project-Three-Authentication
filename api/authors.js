// Create endpoints for authors, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

//create author route
router.get("/", authenticate, async(req, res) => {
    try {
        const authors = await prisma.author.findMany();

        if(authors.length === 0){
            return res.status(404).json({error :"No authors found"})
        }

        res.json(authors)

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//Get Single Author
router.get("/:id", authenticate, async(req, res) => {
    try {
        const author = await prisma.author.findUnique({
            where: {
                id:Number(req.params.id)
            },
        });

        if(author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({message : "Author not found"})
        }

    } catch (error) {
        res.status(500).json({message : "failed to get author"})
    }
});

//Add Author
router.post("/", authenticate, async(req, res) => {
    try {
        const author = await prisma.author.create({
            data: req.body,
        });
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({message: "failed to add Author"})
    }
});

//update Author
router.put("/:id", authenticate, async(req, res) => {
    try {
        const author = await prisma.author.update({
            where : {
                id:Number(req.params.id),
            },
            data : req.body,
        });

        if(author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({message:"Author not found"})
        }
    } catch (error) {
        res.status(500).json({message : "failed to update author"})
    }
});

//Delete Auhtor
router.delete("/:id", authenticate, async(req, res) => {
    try {
        const author = await prisma.author.delete({
            where: {
                id:Number(req.params.id),
            },
        });

        if(author) {
            res.status(200).json({message: "Author deleted"})
        } else {
            res.status(404).json({message: "Author not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to delete Author"})
    }
});



export default router;