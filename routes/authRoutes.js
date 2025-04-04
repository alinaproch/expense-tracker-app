import express from "express";
import { registerUser } from "../controllers/authController.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимум 6 символов").isLength({ min: 6 }),
    check("name", "Имя обязательно").notEmpty(),
  ],
  registerUser
);

export default router;
