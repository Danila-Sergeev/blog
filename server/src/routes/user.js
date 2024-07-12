import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.js";
import { registrationValidator } from "../validations/auth.js";

const userRouter = Router();
userRouter.get("/", getUsers);
userRouter.post("/", registrationValidator, createUser);

export default userRouter;
