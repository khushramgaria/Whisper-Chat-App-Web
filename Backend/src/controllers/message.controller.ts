import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";

export const getMessages = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const chatId = req.params.chatId;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId,
    });

    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
      return;
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "_id name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      data: messages,
      message: "Messages retrieved successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error getting messages: ", error);
    res.status(500);
    next(error);
  }
};
