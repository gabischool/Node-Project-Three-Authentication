// Create endpoints for authors, make sure to use the middleware to authenticate the token
import express from 'express';
import prisma from './lib/index.js'
import authenticate from './middleware/authenticate.js';
const router = express.Router();

//getting the author

router.get('/',authenticate, async (req, res)=>{
  try {
    const  authors = await prisma.author.findMany();
    if (authors.length===0){
        return res.status(404).json({error: 'Book not found'});
    }
    res.json(authors);

}catch(error){
    res.status(500).json({error: error.message});
}
})
//getting the author by id
router.get('/:id', async (req, res)=>{
    try{
     const {id}= req.params;
     const author = await prisma.author.findUnique({
        where: {id:Number(id)},
        if (author=null){
        return res.status(404).json({error: 'Book not found'});
        }
        
     })
     res.json(author)
    }
    
    catch(error){

    }
});
/// creating new athour
router.post('/',authenticate, async (req, res)=>{
    try{
        const { name} =  req.body;
      const author = await prisma.author.create({
        data: {
            name,
      },
    });
      if (!author){
        return res.status(404).json({error: 'Not Found'});
    }
     res.json(author);
}catch(err){
    res.status(500).json({error: err.message});
}
});
////edit the author
router.put('/:id',authenticate, async (req,res)=>{
    try{
        const {id} = req.params;
       const { name} = req.body;

       const author= await prisma.author.update({
          where: {
            id:     Number(id),
          }, 
          data:{
            name,
          },
       })
       if(!author){
        return res.status(404).json({error:'not found'});
       }
       res.json(author);
    }catch(err){
        res.status(500).json({error: err.message});
    }

});

 ///delete the author
router.delete('/:id',authenticate, async  (req, res)=>{
 try {
    const {id} = req.params;
    const author = await prisma.author.delete({
        where: {id: Number(id),
        },
    });
    if(!author){
        return res.status(404).json({error:'book not found'});
    }
    res.json(author);
 }catch(err){
     res.status(500).json({error: err.message});
 }
});


export default router;