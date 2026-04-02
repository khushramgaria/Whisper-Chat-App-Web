import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express";

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      data: user,
      message: "User retrieved successfully",
      success: true,
    });
  } catch (error) {
    console.log("error getting current user: ", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });

    res.status(500);
    next(error);
  }
};

export const authCallback = async (req: Request, res: Response) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser.imageUrl,
      });
    }

    res.status(200).json({
      data: user,
      message: "User authenticated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error during auth callback: ", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
