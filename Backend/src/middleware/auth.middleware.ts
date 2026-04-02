import { getAuth, requireAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

export type AuthRequest = Request & {
  userId: string;
};

export const authMiddleware = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);

      //   if (!clerkId) {
      //     return res.status(401).json({
      //       message: "Unauthorized",
      //       success: false,
      //     });
      //   }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({
          message: "User Not Found",
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
  },
];
