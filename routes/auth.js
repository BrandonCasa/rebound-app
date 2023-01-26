import express from "express";
import { login, logout } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login); // (POST) /auth/login
router.post("/logout", logout); // (POST) /auth/logout

export default router;