import { config as conf } from "dotenv";

conf();

const { PORT, DB_URL, JWT_SECRET, ORIGIN } = process.env;

const _config = {
    port: PORT,
    databaseURL: DB_URL,
    jwtSecret: JWT_SECRET,
    origin: ORIGIN
}

export const config = Object.freeze(_config);