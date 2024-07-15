import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registrationValidator } from "./validations/auth.js";
import auth from "./middlewares/auth.js";
import userRouter from "./routes/user.js";
import { createUser, login } from "./controllers/users.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO");
});
app.post("/signin", login);
app.post("/signup", registrationValidator, createUser);
app.use(auth);
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
