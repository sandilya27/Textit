import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";

interface CustomRequest extends Request {
    userId?: string;
}

export const searchContacts = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm) {
            const error = createHttpError(400, "Search term is required!");
            return next(error);
        }

        const contacts = await userModel.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [
                        { firstName: { $regex: searchTerm, $options: 'i' } },
                        { lastName: { $regex: searchTerm, $options: 'i' } },
                        { email: { $regex: searchTerm, $options: 'i' } }
                    ]
                }
            ]
        }).select('-password');

        console.log(contacts)

        const mappedContacts = contacts.map(contact => ({
            id: contact._id,
            email: contact.email,
            firstName: contact.firstName,
            lastName: contact.lastName,
            image: contact.image,
            color: contact.color,
            profileSetup: contact.profileSetup
        }));

        console.log(mappedContacts)


        res.status(200).json({ contacts: mappedContacts });

    } catch (error) {
        return createHttpError(500, "Internal server error!");
    }
}
