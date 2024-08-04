import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

import userModel from "../models/userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email: string, userId: string) => {
    return sign({ email, userId }, config.jwtSecret as string, {
        expiresIn: maxAge
    })
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
}