import express from "express";

import { verifyToken } from "../middlewares/authMiddleware";
import { searchContacts } from "../controllers/contactControllers";

export const contactRouter=express.Router();

contactRouter.post("/search",verifyToken,searchContacts);