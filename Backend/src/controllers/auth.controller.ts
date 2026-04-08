import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
import { comparePasswords, encryptPassword } from "../utils/password.util.js";
import { generateAccessToken } from "../utils/jwt.util.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await encryptPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      data: user,
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log("error registering user: ", error);
    res.status(500);
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email !!",
        success: false,
      });
    }

    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password !!",
        success: false,
      });
    }

    const accessToken: string = await generateAccessToken(user.id);

    return res.status(200).json({
      data: {
        user,
        accessToken,
      },
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.log("error logging in user: ", error);
    res.status(500);
    next(error);
  }
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

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
    res.status(500);
    next(error);
  }
};
