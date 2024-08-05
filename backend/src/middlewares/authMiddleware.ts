import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";


import { config } from "../config/config";

interface CustomRequest extends Request {
    userId?: string;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        const error = createHttpError(401, "You are not authenticated!");
        return next(error);
    }

    jwt.verify(token, config.jwtSecret as string, async (err: jwt.VerifyErrors | null, payload: any) => {
        if (err) {
            const error = createHttpError(403, "Token is not valid!");
            return next(error);
        }
        if (payload) {
            const { userId } = payload as JwtPayload;
            req.userId = userId;
        }

        next();
    });
}