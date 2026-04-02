import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  authCallback,
  getCurrentUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/me", authMiddleware, getCurrentUser);
router.post("/callback", authCallback);

export default router;
