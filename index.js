import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

db.sequelize.sync({ // make the database in sync with the changes in the models
    alter: true
}).then(()=>{
    const port = process.env.APP_PORT ;
    app.listen(port,()=>{
        console.log(`Server is running on port http://localhost:${port}`);
    });
});

app.get('/',(req,res)=>{
    res.send('Hello World');
})

import commentsRouter from './routes/comments.js';
app.use('/comments',commentsRouter);

import usersRouter from './routes/users.js';
app.use('/users',usersRouter);

import postsRouter from './routes/posts.js';
app.use('/posts',postsRouter);

import likeRouter from './routes/likes.js'
app.use('/likes',likeRouter)