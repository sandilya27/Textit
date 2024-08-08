import express from "express";
import multer from "multer";

import { createUser, getUserInfo, loginUser, updateProfile, addProfileImage, removeProfileImage } from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

export const userRouter = express.Router();

const upload = multer({
    dest: "uploads/profiles/",
})

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-info", verifyToken, getUserInfo);
userRouter.post("/update-profile", verifyToken, updateProfile);
userRouter.post(
    "/add-profile-image",
    verifyToken,
    upload.single("profile-image"),
    addProfileImage
);
userRouter.delete("/remove-profile-image", verifyToken, removeProfileImage);