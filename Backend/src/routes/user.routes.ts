import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware";
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", verifyAuth, getUsers);

export default router;
