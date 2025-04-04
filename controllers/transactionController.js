import { validationResult } from "express-validator";
import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, type, category } = req.body;

  try {
    const newTransaction = new Transaction({
      amount,
      type,
      category,
      user: req.userId,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
