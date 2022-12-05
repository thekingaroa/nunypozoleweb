import { Router } from "express";
import { authLogin, authSign } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/api/login", authLogin);
router.post("/api/signup", authSign);

export default router;
