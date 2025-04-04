import express from "express";
import { check } from "express-validator";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    check("amount", "Сумма должна быть числом").isNumeric(),
    check("type", "Тип транзакции должен быть обязательным").not().isEmpty(),
    check("category", "Категория должна быть обязательной").not().isEmpty(),
  ],
  protect,
  createTransaction
);
router.get("/", protect, getTransactions);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
