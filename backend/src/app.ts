import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { userRouter } from "./routes/userRouter";
import { config } from "./config/config";

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: [config.origin as string],
        methods: ["GET", "POST"],
        credentials: true
    })
);
app.use(cookieParser());

//Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome my friend" })
})

app.use('/api/users', userRouter);

//Global error handler
app.use(globalErrorHandler);

export default app;