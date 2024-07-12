import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registrationValidator } from "./validations/auth.js";
import { validationResult } from "express-validator";
import userRouter from "./routes/user.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO");
});
/* app.post("/auth/register", registrationValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
}); */

app.use("/user", userRouter);
const connect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://127.0.0.1:27017/blog");
  app.listen(4444, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Server OK");
  });
};

connect();
