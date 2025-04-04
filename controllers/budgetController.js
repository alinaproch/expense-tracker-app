import { validationResult } from "express-validator";
import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { limit, period, category } = req.body;

  try {
    const newBudget = new Budget({
      limit,
      period,
      category,
      user: req.userId,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
