import express from "express";
import { check } from "express-validator";
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    check("limit", "Лимит бюджета должен быть числом").isNumeric(),
    check("period", "Период не может быть пустым").not().isEmpty(),
    check("category", "Категория не может быть пустой").not().isEmpty(),
  ],
  protect,
  createBudget
);
router.get("/", protect, getBudgets);
router.put("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);

export default router;
