import yup from 'yup';
import { Router } from 'express';
import db from '../models/index.js';
import { or } from 'sequelize';

const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
    const posts = await db.Posts.findAll({
     order:[['created_at','DESC']]
    });
    res.json(posts);
});

postsRouter.post('/create',async(req,res)=>{
    let data = req.body;
    let validationSchema = yup.object({
     post: yup.string().required(),
    })
    try{
     data = await validationSchema.validate(data,{
          abortEarly:false
     })
     console.log("validate",data);
     let result = await db.Posts.create(data);
     console.log("result",result);
     res.json(result)
    }
    catch(err){
     res.status(400).json({
          errors:err.errors
     })
    }
    })

postsRouter.put('/post/:id',async(req,res)=>{
    let data = req.body;
    let validationSchema = yup.object({
     post: yup.string().required(),
    })
    try{
     data = validationSchema.validate(data,{
          abortEarly:false
     })
     let result = await db.Posts.update(data,{
          where:{
               id:req.params.id
          }
     });
     res.json(result)
    }
    catch(err){
     res.status(400).json({
          errors:err.errors
     })
    }
    })

postsRouter.delete('/post/:id',async(req,res)=>{

    let result = await db.Posts.findByPk(req.params.id);
    console.log(result);
    }
    )

export default postsRouter;