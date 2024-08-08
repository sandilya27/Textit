import { config as conf } from "dotenv";

conf();

const { PORT, DB_URL, JWT_SECRET, ORIGIN, CLOUDINARY_CLOUD, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const _config = {
    port: PORT,
    databaseURL: DB_URL,
    jwtSecret: JWT_SECRET,
    origin: ORIGIN,
    cloudName: CLOUDINARY_CLOUD,
    cloudinaryApiKey: CLOUDINARY_API_KEY,
    cloudinaryApiSecret: CLOUDINARY_API_SECRET
}

export const config = Object.freeze(_config);