import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt, { compare } from "bcrypt";
import fs from "node:fs";
import path from "node:path";

import userModel from "../models/userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import cloudinary from "../config/cloudinary";

interface CustomRequest extends Request {
    userId?: string;
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email: string, userId: string) => {
    return sign({ email, userId }, config.jwtSecret as string, {
        expiresIn: maxAge
    })
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }

        const user = await userModel.findOne({ email });

        if (user) {
            const error = createHttpError(400, "User already exsist!");
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email,
            password: hashedPassword,
        })

        const token = createToken(newUser.email, newUser._id);

        res.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "none"
        })

        res.status(201).json({
            user: {
                id: newUser._id,
                email: newUser.email,
                profileSetup: newUser.profileSetup
            }
        });
    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            const error = createHttpError(404, "User with given email not found!");
            return next(error);
        }

        const auth = await compare(password, user.password);

        if (!auth) {
            const error = createHttpError(400, "Password is incorrect!");
            return next(error);
        }


        const token = createToken(user.email, user._id);

        res.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "none"
        })

        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            }
        });
    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}

export const getUserInfo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userData = await userModel.findById(req.userId);

        if (!userData) {
            const error = createHttpError(404, "User with given id not found!");
            return next(error);
        }

        res.status(200).json({
            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        });

    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}

export const updateProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;

        console.log(color);

        if (!firstName || !lastName) {
            const error = createHttpError(400, "Firstname & lastname is required!");
            return next(error);
        }

        const userData = await userModel.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                color: color,
                profileSetup: true
            },
            { new: true, runValidators: true }
        );


        res.status(200).json({
            id: userData?._id,
            email: userData?.email,
            profileSetup: userData?.profileSetup,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            image: userData?.image,
            color: userData?.color
        });

    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}

export const addProfileImage = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req;
        console.log(userId);
        if (!req.file) {
            const error = createHttpError(400, "File is required!");
            return next(error);
        }

        const file = req.file;

        const profileImageMimeType = file.mimetype.split('/')[1];
        const fileName = file.filename;
        const filePath = path.resolve(__dirname, "../../uploads/profiles", fileName)
        let uploadResult;

        try {
            uploadResult = await cloudinary.uploader.upload(filePath, {
                public_id: fileName,
                folder: "profile-image",
                format: profileImageMimeType,
            });
        } catch (error) {
            console.log(error)

            return next(createHttpError(500, "Error while uploading profile image!"));
        }

        const updateUser = await userModel.findByIdAndUpdate(userId, { image: uploadResult.secure_url }, { new: true, runValidators: true });

        await fs.promises.unlink(filePath);

        res.status(200).json({
            image: updateUser?.image,
        });

    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}

export const removeProfileImage = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId);

        if (!user) {
            const error = createHttpError(404, "User not found!");
            return next(error);
        }

        user.image = "";
        await user.save();

        res.status(200).json({
            message: "profile image removed successfully"
        });

    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}

