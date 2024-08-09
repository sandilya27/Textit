import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { config } from './config/config';

const setupSocket = (server: HttpServer | HttpsServer) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: config.origin,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    const userSocketMap = new Map();

    const disconnect = (socket: Socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`)
        }

        socket.on("disconnect", () => disconnect(socket))
    })
}

export default setupSocket;