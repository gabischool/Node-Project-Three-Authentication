// Create endpoints for bookstores, make sure to use the middleware to authenticate the token

import express from 'express'
import prisma from './lib/index.js'
import autenticate from './middleware/authenticate.js';

const router = express.Router();

router.get('/', async(req, res)=> {
    try {
     const bookstores = await prisma.bookstrore.findMany();

     if(bookstores.length === 0){
        return res.status(404).json({error: "Wax bookstore majiriran"})
     }

     res.json(bookstores)
    }catch(error) {
        res.status(500).json({error: error.message})
    }
})

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const bookstore = await prisma.bookstrore.findUnique({
            where: {
                id: Number(id),
            },
        });
        
        if(!bookstore) {
            return res.status(404).json({ error: " wax book mahayo"})
        }

        res.json(bookstore);
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post("/", autenticate, async (req, res) => {
    try {
     const { name, location } = req.body;
     const bookstore = await prisma.bookstrore.create({
        data: {
            name,
            location,
        },
     });

     if(!bookstore){
      return res.status(404).json({ error: "bookstore not found"})
     }
  
      res.json({message: "bookstore created succesfully", bookstore});
    
    } catch (err) {
      res.status(500).json({ message: "Failed to add bookstore" });
    }
  });

  router.put("/:id", async(req, res)=> {
    try {
        const bookstore = await prisma.bookstrore.update({
            where: {
                id: Number(req.params.id),
            },

            data: req.body,
        });

        if(bookstore){
         res.status(200).json(bookstore);
        }else {
        res.status(404).json({ message: "mahelin bookstore" });
        }
    }catch (error) {
        res.status(500).json({ message: "Failed to update bookstore" });  
    }
 });

 router.delete("/:id", async (req, res) => {
    try {
      const bookstore = await prisma.bookstrore.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (bookstore) {
        res.status(200).json({ message: "bookstore deleted" });
      } else {
        res.status(404).json({ message: "bookstore not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed  delete bookstore" });
    }
  });


export default router;