import yup from 'yup';
import { Router } from 'express';
import db from '../models/index.js';

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
    const comments = await db.Comments.findAll();
    console.log(comments);
    res.json(comments);
});

commentsRouter.post('/post',async(req,res)=>{
   let data = req.body;
   let validationSchema = yup.object({
    comment: yup.string().required(),
   })
   try{
    data = validationSchema.validate(data,{
        abortEarly:false
    })
    let result = await db.Comments.create(data);
    res.json(result)
   }
   catch(err){
    res.status(400).json({
        errors:err.errors
    })
   }
})

export default commentsRouter;