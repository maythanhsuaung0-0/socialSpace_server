"use strict";
import fs from "fs";
import {dirname,basename} from "path";
import {Sequelize , DataTypes} from "sequelize";
import process from "process";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};
dotenv.config();
// Create sequelize instance using config
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    define: {
        timestamps: false
    }
  }
);

const files = fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename(__filename) && file.slice(-3) === ".js"
    );
  })
  console.log(files)
  // here, never use foreach if you want to use await inside it
  // caz it will not wait for the promise to resolve
  for(const file of files){
    const modelImport = await import(`./${file}`);
    const model = modelImport.default(sequelize, DataTypes);
    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  };


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
