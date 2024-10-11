import yup from 'yup';
import { Router } from 'express';
import db from '../models/index.js';
import { where } from 'sequelize';

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
    const comments = await db.Comments.findAll();
    console.log(comments);
    res.json(comments);
});

commentsRouter.post('/getByPost', async(req,res)=>{
    const post = req.body;
    const data = await db.Comments.findAll({
        where:{PostId:post.PostId}
    })
    console.log(data)
    res.json(data)
})

commentsRouter.post('/post',async(req,res)=>{
   let data = req.body;

   let validationSchema = yup.object({
    comment: yup.string().required(),
   })
   try{
    data = await validationSchema.validate(data,{
        abortEarly:false
    })
    let result = await db.Comments.create(data);
    console.log(data)
    res.json(result)
   }
   catch(err){
    res.status(400).json({
        errors:err.errors
    })
   }
})

export default commentsRouter;