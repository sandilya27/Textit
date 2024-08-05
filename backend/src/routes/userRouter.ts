import express from "express";

import { createUser, getUserInfo, loginUser } from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

export const userRouter = express.Router();


userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-info", verifyToken, getUserInfo);