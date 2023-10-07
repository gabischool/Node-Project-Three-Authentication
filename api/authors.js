// Create endpoints for authors, make sure to use the middleware to authenticate the token

import express  from "express";
import prisma from "./lib/index.js";
import autenticate from './middleware/authenticate.js'

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const authors = await prisma.author.findMany();

    if(authors.length === 0){
     return res.status(404).json({error: "wax authors majiran"})
    }
     res.json(authors)
  }catch (error) {
    res.status(500).json({error: error.message})
  }
});

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const author = await prisma.author.findUnique({
            where: {
                id: Number(id),
            },
        });
        
        if(!author) {
            return res.status(404).json({ error: " wax author mahayo"})
        }

        res.json(author);
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post("/", async (req, res) => {
    try {
     const { name } = req.body;
     const author = await prisma.author.create({
        data: {
            name,
        },
     });

     if(!author){
      return res.status(404).json({ error: "authors not found"})
     }
  
      res.json({message: "Author created succesfully", author});
    
    } catch (err) {
      res.status(500).json({ message: "Failed to add authors" });
    }
  });

 router.put("/:id", async(req, res)=> {
    try {
        const author = await prisma.author.update({
            where: {
                id: Number(req.params.id),
            },

            data: req.body,
        });

        if(author){
         res.status(200).json(author);
        }else {
        res.status(404).json({ message: "mahelin author" });
        }
    }catch (error) {
        res.status(500).json({ message: "Failed to update Authors" });  
    }
 });

 router.delete("/:id", async (req, res) => {
    try {
      const author = await prisma.author.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (author) {
        res.status(200).json({ message: "Authors deleted" });
      } else {
        res.status(404).json({ message: "Authors not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed  delete Authors" });
    }
  });

export default router;