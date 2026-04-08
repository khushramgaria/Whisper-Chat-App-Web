import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyAuth, getCurrentUser);

export default router;
