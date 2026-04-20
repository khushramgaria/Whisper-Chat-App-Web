import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", verifyAuth, getUsers);

export default router;
