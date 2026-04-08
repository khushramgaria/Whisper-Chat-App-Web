import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { verifyAccessToken } from "./jwt.util.js";

// store online users in the memory: userId -> socketid
export const onlineUsers: Map<string, string> = new Map();

export const initializeSocket = (httpServer: HttpServer) => {
  const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL!];

  const io = new SocketServer(httpServer, { cors: { origin: allowedOrigins } });

  // Verify socket connection: if the user is authenticated, we will store the user id in the socket
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      // Verify the JWT token (same as verifyAccessToken in your middleware)
      const decodedToken = await verifyAccessToken(token);

      // Validate decoded token structure (matches your HTTP middleware)
      if (
        !decodedToken ||
        typeof decodedToken !== "object" ||
        !("id" in decodedToken) ||
        typeof (decodedToken as any).id !== "string"
      ) {
        return next(
          new Error("Authentication error: Invalid or expired token"),
        );
      }

      const user = await User.findById(decodedToken.id);

      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }

      socket.data.userId = user._id.toString();
      next();
    } catch (error: any) {
      next(new Error(error));
    }
  });

  // It triggers the connection method when new client connects to the server
  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    console.log(`User connected: ${userId}`);

    // Send list of online users to the newly connected client
    socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) });

    // store user in the onlineUsers map
    onlineUsers.set(userId, socket.id);

    // notify other users that the current client is online
    socket.broadcast.emit("user-online", { userId });

    socket.join(`user:${userId}`);

    socket.on("join-chat", (chatId: string) => {
      socket.join(`chat:${chatId}`);
    });

    socket.on("leave-chat", (chatId: string) => {
      socket.leave(`chat:${chatId}`);
    });

    // handle sending messages
    socket.on(
      "send-message",
      async (data: { chatId: string; text: string }) => {
        try {
          const { chatId, text } = data;

          const chat = await Chat.findOne({
            _id: chatId,
            participants: userId,
          });

          if (!chat) {
            return socket.emit("socket-error", {
              message: "Chat not found or access denied",
              success: false,
            });
          }

          const message = await Message.create({
            chat: chatId,
            sender: userId,
            text,
          });

          chat.lastMessage = message._id;
          chat.lastMessageAt = new Date();
          chat.save();

          await message.populate("sender", "_id name email avatar");

          // emit to chat room (for users inside the chat)
          io.to(`chat:${chatId}`).emit("new-message", message);

          // also emit to participant's personal room (for chat list view)
          for (const participantId of chat.participants) {
            io.to(`user:${participantId}`).emit("new-message", message);
          }
        } catch (error) {
          return socket.emit("socket-error", {
            message: "Internal server error",
            success: false,
          });
        }
      },
    );

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);

      socket.broadcast.emit("user-offline", { userId });
    });
  });

  return io;
};
