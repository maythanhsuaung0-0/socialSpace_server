import db from "../models/index.js";
import { Router } from "express";
import yup from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import vToken from "../middlewares/auth.js";
import { where } from "sequelize";
dotenv.config();

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const users = await db.Users.findAll();
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await db.Users.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      errors: ["User not found"],
    });
  }
});

usersRouter.post("/register", async (req, res) => {
  let data = req.body;
  let user = await db.Users.findOne({
    where: { email: data.email },
  });
  if (user) {
    res.status(400).json({
      errors: ["User already exists"],
    });
    return;
  }
  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3)
      .max(50)
      .required()
      .matches(
        /^[a-zA-Z ]+$/,
        "Name must contain only alphabets and, special characters and spaces"
      ),
    email: yup.string().trim().lowercase().email().max(50).required(),
    password: yup
      .string()
      .trim()
      .min(8)
      .max(50)
      .required()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/,
        "password at least 1 special character, 1 number"
      ),
  });
  try {
    data = await validationSchema.validate(data, {
      abortEarly: false,
    });
    data.password = await bcrypt.hash(data.password, 10);
    console.log("user data", data);
    let result = await db.Users.create(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      errors: err.errors,
    });
  }
});

usersRouter.post("/login", async (req, res) => {
  let data = req.body;

  let validationSchema = yup.object({
    email: yup.string().trim().lowercase().email().max(50).required(),
    password: yup.string().trim().min(8).max(50).required(),
  });
  //   validate the data first
  try {
    data = await validationSchema.validate(data, { abortEarly: false });
  } catch (err) {
    res.status(400).json({
      errors: err.errors,
    });
    return;
  }
  // find in the database using validated data
  let user = await db.Users.findOne({
    where: { email: data.email },
  });
  if (!user) {
    res.status(400).json({
      errors: ["Invalid email or Email doesn't exist"],
    });
    return;
  }
  let match = await bcrypt.compare(data.password, user.password);
  if (!match) {
    res.status(400).json({
      errors: ["Password is incorrect"],
    });
    return;
  }
  let userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  let validateToken = jwt.sign(userInfo, process.env.APP_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  res.json({
    accessToken: validateToken,
    user: userInfo,
  });
});

usersRouter.post("/auth", vToken, async (req, res) => {
  const data = req.user;
  console.log("data", req.user);
    let userInfo = {
      id: data.id,
      name: data.name,
      email: data.email,
    };
    res.json({
      user: userInfo,
    });
  
});

export default usersRouter;
