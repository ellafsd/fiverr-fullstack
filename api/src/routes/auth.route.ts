import express from "express";
import {register, login, logout, getProfile } from "../controllers/auth.controller.js"
import protect from "../middlewares/protect.middleware.js"
import upload from "../utils/multer.js";

// Create Router
const router = express.Router();


// end points
router.route("/register").post(upload.single("profilePicture"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(protect, getProfile);

export default router;