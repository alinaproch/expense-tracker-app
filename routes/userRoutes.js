import express from "express";
import { check } from "express-validator";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Пожалуйста, введите корректный email").isEmail(),
    check("password", "Пароль должен содержать минимум 6 символов").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Пожалуйста, введите корректный email").isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
  ],
  loginUser
);

router.get("/me", protect, getUser);

export default router;
