import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { register, login, getMe } from "../../modules/auth/auth.controller.js";

const router = express.Router();

router.post("/register", asyncHandler(register));

router.post("/login", asyncHandler(login));

router.get("/me", auth, asyncHandler(getMe));

export default router;
