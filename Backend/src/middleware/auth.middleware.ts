import type { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { verifyAccessToken } from "../utils/jwt.util";

export type AuthRequest = Request & {
  userId: string;
};

export const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.header("Authorization")
        ? req.header("Authorization")!.replace("Bearer ", "")
        : undefined);

    if (!token) {
      return res.status(401).json({
        message: "Token not found !!",
        success: false,
      });
    }

    const decodedToken = await verifyAccessToken(token);

    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !("id" in decodedToken) ||
      typeof (decodedToken as any).id !== "string"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    const user = await User.findById((decodedToken as any).id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found !!",
        success: false,
      });
    }

    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.log("error during auth middleware passing: ", error);
    res.status(500);
    next(error);
  }
};
