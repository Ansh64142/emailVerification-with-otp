import express from "express";
import { register, verifyEmail } from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/verifyemail", verifyEmail);

export default authRoutes;
