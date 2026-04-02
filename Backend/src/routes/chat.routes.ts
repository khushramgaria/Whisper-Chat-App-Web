import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getChats, getOrCreateChat } from "../controllers/chat.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getChats);
router.post("/with/:participantId", getOrCreateChat);

export default router;
