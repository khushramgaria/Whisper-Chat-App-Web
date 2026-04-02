import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMessages } from "../controllers/message.controller.js";

const router = Router();

router.get("/chat/:chatId", authMiddleware, getMessages);

export default router;
