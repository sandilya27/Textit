import { config as conf } from "dotenv";

conf();

const { PORT, DB_URL } = process.env;

const _config = {
    port: PORT,
    databaseURL: DB_URL,
}

export const config = Object.freeze(_config);