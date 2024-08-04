import mongoose from "mongoose";

import { config } from "./config";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log(`Connected to the DB successfully`);
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Error in connecting to DB: ${err}`);
        });

        await mongoose.connect(config.databaseURL as string);
    } catch (err) {
        console.error(`Failed to connect to db ${err}`);
        process.exit(1);
    }

}