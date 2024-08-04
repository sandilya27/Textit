import express from "express";

import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

//Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome my friend" })
})

//Global error handler
app.use(globalErrorHandler);

export default app;