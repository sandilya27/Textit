import express from "express";

import { createUser } from "../controllers/userControllers";

export const userRouter = express.Router();


userRouter.post("/register",createUser);