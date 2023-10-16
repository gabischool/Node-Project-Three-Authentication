// Create endpoints for authors, make sure to use the middleware to authenticate the token

import express from 'express'

import  prisma  from './lib/index.js';


const router = express.Router();

// create author route

router.get("/", async (req ,res)=>{
  try{
    const authors = await prisma.author.findMany();

    if(authors){
     res.status(200).json(authors)
    }else{
         res.status(404).json({error: 'No authors found'});
    }

  }catch(err){
    res.status(500).json({message: "failed to get authors"})
  }
});

router.get('/:id', async (req ,res)=>{

  try{

    const author = await prisma.author.findUnique({
      where:{
        id: Number(req.params.id),
      },
    });

    if(author){
      res.status(200).json(author)
     }else{

         res.status(404).json({error: 'No authors found'});
    }

  }catch(err){
    res.status(500).json({err:  err.message})
  }
});

// Add Author
router.post("/", async (req, res) => {
  try {

    const author = await prisma.author.create({
      data: req.body

    });

    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: "Failed to add author" });
  }
});




export default router;