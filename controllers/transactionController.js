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

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Транзакция не найдена" });
    }

    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    await transaction.deleteOne();
    res.json({ message: "Транзакция удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateTransaction = async (req, res) => {
  const { amount, type, category } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Транзакция не найдена" });
    }

    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    transaction.amount = amount ?? transaction.amount;
    transaction.type = type ?? transaction.type;
    transaction.category = category ?? transaction.category;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
