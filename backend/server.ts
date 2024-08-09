import app from "./src/app";
import { config } from "./src/config/config";
import { connectDB } from "./src/config/db";
import setupSocket from "./src/socket";

const startServer = async () => {
    const port = config.port || 3000;

    await connectDB();

    const server=app.listen(port, () => {
        console.log(`Listening on the port: ${port}`)
    })

    setupSocket(server);
}

startServer();