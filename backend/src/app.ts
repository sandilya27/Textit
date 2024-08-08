import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { userRouter } from "./routes/userRouter";
import { config } from "./config/config";
import { contactRouter } from "./routes/contactRoute";

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: [config.origin as string],
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    })
);
app.use(cookieParser());

app.use("/uploads/profiles", express.static("/uploads/profiles"));

//Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome my friend" })
})

app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);

//Global error handler
app.use(globalErrorHandler);

export default app;