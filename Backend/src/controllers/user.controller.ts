import type { NextFunction, Response } from "express";
import { User } from "../models/user.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const getUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const users = await User.find({ _id: { $ne: userId } }).select(
      "_id name email avatar",
    );

    return res.status(200).json({
      data: users,
      message: "Users retrieved successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error getting users: ", error);
    res.status(500);
    next(error);
  }
};
