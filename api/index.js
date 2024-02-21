import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "./routes/user.route.js";

dotenv.config();
const port = 3000;
mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

const app = express();

app.listen(port, () => console.log(`Example app listening on port ${port}!!`));

app.use("/api/user" ,Router);