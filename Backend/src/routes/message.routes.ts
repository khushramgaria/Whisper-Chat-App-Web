import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { getMessages } from "../controllers/message.controller.js";

const router = Router();

router.get("/chat/:chatId", verifyAuth, getMessages);

export default router;
