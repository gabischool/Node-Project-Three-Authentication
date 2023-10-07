// Create endpoints for books, make sure to use the middleware to authenticate the token

import express  from "express";
import prisma from "./lib/index.js";
import autenticate from './middleware/authenticate.js'

const router = express.Router();

router.get('/', async(req, res) => {
    try {
      const books = await prisma.book.findMany();
  
      if(books.length === 0){
       return res.status(404).json({error: "wax book majiran"})
      }
       res.json(books)
    }catch (error) {
      res.status(500).json({error: error.message})
    }
  });

  router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
            where: {
                id: Number(id),
            },
        });
        
        if(!book) {
            return res.status(404).json({ error: " wax book mahayo"})
        }

        res.json(book);
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post("/", autenticate, async (req, res) => {
    try {
     const { title, price, image } = req.body;
     const book = await prisma.book.create({
       
        data: req.body,
        
     });

     if(book){
        res.status(201).json(book);
     }else {
        res.status(404).json({ message: 'book not found' });
     }
  
    } catch (err) {
      res.status(500).json({ message: "Failed to add book" });
    }
  });

  router.put("/:id", async(req, res)=> {
    try {
        const book = await prisma.book.update({
            where: {
                id: Number(req.params.id),
            },

            data: req.body,
        });

        if(book){
         res.status(200).json(book);
        }else {
        res.status(404).json({ message: "mahelin book" });
        }
    }catch (error) {
        res.status(500).json({ message: "Failed to update book" });  
    }
 });

 router.delete("/:id", async (req, res) => {
    try {
      const book = await prisma.book.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (book) {
        res.status(200).json({ message: "books deleted" });
      } else {
        res.status(404).json({ message: "books not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed  delete books" });
    }
  });

export default router