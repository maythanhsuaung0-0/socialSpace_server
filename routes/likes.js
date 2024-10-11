import db from "../models/index.js";
import { Router } from "express";

const likeRouter = Router();

likeRouter.get("/", async (req, res) => {
  try {
    const data = await db.Likes.findAll();
    res.json(data);
  } catch (err) {
    res.status(400).json({
      errors: err,
    });
  }
});

likeRouter.post("/getByUser", async (req, res) => {
  const key = req.body;
  try {
    const data = await db.Likes.findAll({
      where: { UserId: key.UserId, PostId: key.PostId },
    });
      res.json(data);
    
  } catch (err) {
    res.send(400).json({
      errors: err,
    });
  }
});

likeRouter.post('/getByPost',async(req,res)=>{
    const key = req.body;
  try {
    const data = await db.Likes.findAll({
      where: { PostId: key.PostId },
    });
      res.json(data);
    
  } catch (err) {
    res.send(400).json({
      errors: err,
    });
  }
})

likeRouter.post("/add", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  if (data) {
    const listOfData = await db.Likes.findAll({
      where: {
        UserId: data.UserId,
        PostId: data.PostId,
      },
    });
    console.log(listOfData);
    if (listOfData?.length >= 1) {
      res.status(400).json({
        errors: "Already Liked",
      });
    } else {
      try {
        const liked = await db.Likes.create(data);
        res.json(liked);
      } catch (err) {
        res.status(400).json({
          errors: err,
        });
      }
    }
  }
});

likeRouter.delete("/:id", async (req, res) => {
    console.log(req.params.id)
  let result = await db.Likes.findByPk(req.params.id);
  if (result) {
    await db.Likes.destroy({ where: { id: req.params.id } });
    res.json({
      message: "like is removed.",
    });
  } else {
    res.sendStatus(404);
  }
});

export default likeRouter;
